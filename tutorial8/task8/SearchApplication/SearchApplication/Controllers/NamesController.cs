using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SearchApplication.Models;

namespace SearchApplication.Controllers
{
    public class NamesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Search(string search)
        {
            var namesModel = new Names("names.txt");
            namesModel.PerformSearch(search);

            return View(namesModel);
        }
    }
}