import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const bucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');
      if (!bucket) {
        throw new Error(
          'AWS_S3_BUCKET_NAME is not defined in environment variables',
        );
      }

      const fileExtension = file.originalname.split('.').pop();
      const fileName = `events/${uuidv4()}.${fileExtension}`;

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      // Construct the S3 URL manually
      const region = this.configService.get<string>('AWS_REGION');
      const s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;

      return s3Url;
    } catch (error) {
      console.error('S3 Upload Error:', error);

      if (error.name === 'NoSuchBucket') {
        throw new Error('The specified S3 bucket does not exist');
      } else if (error.name === 'AccessDenied') {
        throw new Error(
          'Access denied to S3 bucket. Please check your credentials and bucket permissions',
        );
      } else {
        throw new Error(`Failed to upload file to S3: ${error.message}`);
      }
    }
  }
}
