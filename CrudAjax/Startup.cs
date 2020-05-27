using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CrudAjax.Startup))]
namespace CrudAjax
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
