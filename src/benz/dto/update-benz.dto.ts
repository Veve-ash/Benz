import { PartialType } from '@nestjs/mapped-types';
import { CreateBenzDto } from './create-benz.dto';

export class UpdateBenzDto extends PartialType(CreateBenzDto) {}
