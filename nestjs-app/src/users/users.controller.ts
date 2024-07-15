import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Next } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return {
      status: 'success',
      results: users.length,
      data: { users },
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { status: 'success', data: { user } };
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return { status: 'success', data: { user: updatedUser } };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { status: 'success', data: null };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: Request, @Next() next: Next) {
    req.params['id'] = req.user['id'];
    next();
  }

  @Patch('updateMe')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.password || updateUserDto.passwordConfirm) {
      throw new BadRequestException('This route is not for password updates. Please use /updateMyPassword instead');
    }
    const filteredBody = filterObj(updateUserDto, 'name', 'email');
    const updatedUser = await this.usersService.update(req.user['id'], filteredBody);
    return { status: 'success', data: { user: updatedUser } };
  }

  @Delete('deleteMe')
  @UseGuards(JwtAuthGuard)
  async deleteMe(@Req() req: Request) {
    await this.usersService.update(req.user['id'], { active: false });
    return { status: 'success', data: null };
  }
}
