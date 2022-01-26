using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ChoiceApplication.ChoiceService;

namespace ChoiceApplication.Controllers
{
    public class MainController : Controller
    {
        // GET: Main
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Image(bool? result)
        {
            var service = new Service1SoapClient("Service1Soap");

            var imageBytes = service.erzeuge_bild();
            ViewBag.Image = Convert.ToBase64String(imageBytes);

            var votes = service.stimmen();
            ViewBag.Votes = votes;

            ViewBag.ErrorMsg = result == false ? "Try again to vote, please" : "";

            return View();
        }

        public ActionResult MakeChoice(int candidateNumber)
        {
            var service = new Service1SoapClient("Service1Soap");

            var result = service.waehle(candidateNumber);
            return RedirectToAction("Image", "Main", new { result });
        }
    }
}