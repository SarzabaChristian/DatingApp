using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            return await context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public ActionResult<AppUser> GetMember(string id)
        {
            var member = context.Users.Find(id);
            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        [HttpPost]
        public async Task<ActionResult> AddMember(AppUser user)
        {
            if (user == null)
            {
                return NotFound();
            }

            var existingUser = await context.Users.FirstOrDefaultAsync(x => x.DisplayName == user.DisplayName && x.Email == user.Email);
            if (existingUser != null)
            {
                return NotFound();
            }

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
