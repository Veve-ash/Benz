import { HttpException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateBenzDto } from './dto/create-benz.dto';
import { UpdateBenzDto } from './dto/update-benz.dto';
import { Benz } from './entities/benz.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { Role } from './enum/benz.role.enum';
import * as argon2 from 'argon2'

@Injectable()
export class BenzService {
  constructor(
    @InjectRepository(Benz)
    private userRepo: Repository<Benz>,
    private jwtService: JwtService
  ){}

  async signUp(createBenzDto: CreateBenzDto) {
    //createmigrationDto.Email = createmigrationDto.Email.toLowerCase()
    const { Email, Password, ...rest } = createBenzDto;
    const user = await this.userRepo.findOne({ where: { Email } });
    if (user) {
     throw new HttpException('sorry user with this email already exist', 400)
    }
    const hashedPassword = await argon2.hash(Password);
   
    const userDetails = await this.userRepo.save({
     Email,
     Password: hashedPassword,
     ...rest
    })
    
    const Userpayload = { id: userDetails.id, email: userDetails.Email };
    return {
     statusCode: 201,
     message:`"${Email} Your account Has been Created Successfully"`,
     access_token: await this.jwtService.signAsync(Userpayload),
    };
   
    }
   
    async signIn(loginDto:LoginDto){
      const{Email, Password}=loginDto
  
      const user = await this.userRepo.createQueryBuilder("user").addSelect("user.Password").where("user.Email = :Email", {Email:loginDto.Email}).getOne()
      const users = await this.userRepo.findOne({where:{Email}});
      if (!user) {
        throw new HttpException('Sorry User not found!',400);
      }

      const isPasswordValid = await this.verifyPassword(Password, user.Password);
      if(isPasswordValid){
        throw new HttpException('Invalid Credentials', 400);
       }
  
      const payload = { sub: user.id, Email: user.Email };
      
      // res.cookie('isAuthenticated', payload,{
      //   httpOnly: true,
      //   maxAge: 1 * 60 * 60 * 1000
      // });
      
      return {
        statusCode: 200,
        message:"Login Successful!",
       access_token: await this.jwtService.signAsync(payload),

      };
    }
   
  //  async logout(@Req() req: Request, @Res() res: Response) {
  //  const clearCookie = res.clearCookie('isAuthenticated');
   
  //  const response = res.send(` user successfully logout`)
   
  //  return {
  //   clearCookie,
  //   response
  //   }
  //   }
   
   
   async findEmail(Email: string) {
    const mail = await this.userRepo.findOneByOrFail({ Email })
    if (!mail) {
     throw new UnauthorizedException()
    }
    return mail;
   }

   async verifyPassword(hashedPassword: string, plainPassword: string,): Promise<boolean> {
    try {
    return await argon2.verify(hashedPassword, plainPassword);
    } catch (err) {
     console.log(err.message)
     return false;
    }
    }
   
    async user(headers: any): Promise<any> {
     const authorizationHeader = headers.authorization;
     if (authorizationHeader) {
     const token = authorizationHeader.replace('Bearer ', '');
     const secret = process.env.JWTSECRET;
     
     try {
   const decoded = this.jwtService.verify(token);
   let id = decoded["id"];
   let user = await this.userRepo.findOneBy({ id });
   return { id: id,  Email: user?.Email, role: user?.role };
    } catch (error) {
     throw new UnauthorizedException('Invalid token');
    
    }} else 
     throw new UnauthorizedException('Invalid or missing Bearer token');
    
    }
  
  
 
   async Update(userId: string): Promise<Benz> {
     const user = await this.userRepo.findOneBy({ id: userId });
 
     if (!user) {
       throw new HttpException('User not found', 404);
     }
 
     user.role = Role.Admin;
     return this.userRepo.save(user);
   }

   async blockUser(id:string): Promise<Benz>{
    const user = await this.userRepo.findOne({where : { id }});
    if(!user) throw new Error('User not found');

    user.isBlocked = !user.isBlocked;
    return this.userRepo.save(user);
   }

   async findAll() {
    return await this.userRepo.find()
   }

   findOne(id: number) {
    return `This action returns a #${id} migration`;
  }


  remove(id: number) {
    return `This action removes a #${id} benz`;
  }
}
