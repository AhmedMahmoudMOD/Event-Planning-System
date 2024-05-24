namespace Event_Planning_System.IServices
{
    public interface IBlobServices
    {
        public Task<string> AddingImage(IFormFile image);
        public Task<bool> RemoveImage(string imagename);
        public Task<string> UpdateImage(string oldimage, IFormFile image);
    }
}
