﻿using System;
using System.Collections.Generic;
using System.IO;
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
            return RedirectToAction("Search");
        }

        public ActionResult Search(string SearchValue)
        {
            var namesModel = new Names("C:\\Users\\Paekva\\names.txt");
            if(SearchValue != null) namesModel.PerformSearch(SearchValue);

            return View(namesModel);
        }

        public ActionResult Reset()
        {
            return RedirectToAction("Search");
        }
    }
}