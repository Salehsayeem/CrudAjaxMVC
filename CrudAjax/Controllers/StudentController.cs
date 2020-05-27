using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudAjax.Models;

namespace CrudAjax.Controllers
{
    
    public class StudentController : Controller
    {
        public ApplicationDbContext db = new ApplicationDbContext();
        // GET: Student
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListOfStudents()
        {
            return Json(db.Students.ToList(), JsonRequestBehavior.AllowGet);
        }

        //For adding
        public JsonResult Add(Student std)
        {
            db.Students.Add(std);
            db.SaveChanges();
            return Json(JsonRequestBehavior.AllowGet);
        }

        //For Updating
        public JsonResult GetById(int Id)
        {
            return Json(db.Students.FirstOrDefault(s => s.Id == Id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Student std)
        {
            var data = db.Students.FirstOrDefault(s => s.Id == std.Id);
            if (data != null)
            {
                data.Name = std.Name;
                data.Email = std.Email;
                data.Address = std.Address;
                db.SaveChanges();
            }

            return Json(JsonRequestBehavior.AllowGet);
        }

        //For deleting
        public JsonResult Delete(int Id)
        {
            var data = db.Students.FirstOrDefault(s => s.Id == Id);
            if (data != null)
            {
                db.Students.Remove(data);
                db.SaveChanges();
            }

            return Json(JsonRequestBehavior.AllowGet);
        }
        
    }
}