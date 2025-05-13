import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { BenzService } from './benz.service';
import { CreateBenzDto } from './dto/create-benz.dto';
import { UpdateBenzDto } from './dto/update-benz.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { Role } from './enum/benz.role.enum';
import { Roles } from './guard/role';
import { RolesGuard } from './guard/role.guard';

@Controller('benz')
export class BenzController {
  constructor(private readonly benzService: BenzService) {}

  @Post('signup')
  create(@Body() createBenzDto: CreateBenzDto) {
    return this.benzService.signUp(createBenzDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.benzService.signIn(loginDto);
  }

  @Get('getall')
  @UseGuards(RolesGuard, AuthGuard())
  @Roles(Role.Admin)
 findAll() {
  return this.benzService.findAll();
}

@Put(':id')
@UseGuards(RolesGuard, AuthGuard())
@Roles(Role.Admin)
update(@Param('id') id: string) {
  return this.benzService.Update(id);
}

@Patch(':id/block')
@UseGuards(RolesGuard, AuthGuard())
@Roles(Role.Admin)
async blockUser(@Param('id') id: string) {
  return this.benzService.blockUser(id);
}


@Get(':id')
findOne(@Param('id') id: string) {
  return this.benzService.findOne(+id);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.benzService.remove(+id);
  }
}
