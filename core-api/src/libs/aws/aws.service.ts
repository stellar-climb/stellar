import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigsService } from '@configs';

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);

  private readonly s3Client: S3Client;

  constructor(private readonly configsService: ConfigsService) {
    this.s3Client = new S3Client({
      region: this.configsService.aws.region,
      endpoint: this.configsService.aws.apiUrl,
      credentials: {
        accessKeyId: this.configsService.aws.accessKeyId,
        secretAccessKey: this.configsService.aws.secretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = `${Date.now()}-${file.originalname}`;
      const command = new PutObjectCommand({
        Bucket: this.configsService.aws.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      return {
        url: `${this.configsService.aws.apiUrl}/${this.configsService.aws.bucketName}/${key}`,
        contentType: file.mimetype,
        filename: file.originalname,
      };
    } catch (error) {
      this.logger.error(`S3 upload failed: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }
}
