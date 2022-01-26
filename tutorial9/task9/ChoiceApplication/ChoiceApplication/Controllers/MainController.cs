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
            
            var colors = new List<string>();
            for(var c = 0; c < votes.Length; c++)
            {
                var color = service.farbevon(c);
                colors.Add(new string('0', (6 - color.Length)) + color);
            }
            ViewBag.Colors = colors;

            ViewBag.ErrorMsg = result == false ? "Try again, please" : "";

            return View();
        }

        public ActionResult MakeChoice(int candidateNumber)
        {
            var service = new Service1SoapClient("Service1Soap");

            var result = service.waehle(candidateNumber);
            return RedirectToAction("Image", "Main", new { result });
        }

        public ActionResult Reset()
        {
            var service = new Service1SoapClient("Service1Soap");

            var result = service.reset();
            return RedirectToAction("Image", "Main", new { result });
        }
    }
}