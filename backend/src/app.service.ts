import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nawy Apartment Listing API - Welcome! 🏢';
  }
}

