using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extenstions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext dbContext, ITokenService _tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterUserDto registerUser)
    {
        if (await IsEmailExists(registerUser.Email))
        {
            return BadRequest("Email taken");
        }

        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            DisplayName = registerUser.DisplayName,
            Email = registerUser.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUser.Password)),
            PasswordSalt = hmac.Key
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        return user.ToDto(_tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await dbContext.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
        if (user == null) return Unauthorized("Invalid Email Address");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (var i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }

        return user.ToDto(_tokenService);
    }

    private async Task<bool> IsEmailExists(string email)
    {
        return await dbContext.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }

}
