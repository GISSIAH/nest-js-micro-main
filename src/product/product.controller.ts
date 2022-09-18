import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @EventPattern('product_created')
  async productCreated(data) {
    console.log(data)
    await this.productService.create({
      id: data.id,
      title: data.title,
      image: data.image,
      likes: data.likes,
    });
  }

  @EventPattern('product_updated')
  async productUpdated(data) {
    await this.productService.update(data.id, {
      title: data.title,
      image: data.image,
      likes: data.likes,
    });
  }

  @EventPattern('product_deleted')
  async productDeleted(id) {
    await this.productService.delete(id);
  }
}
