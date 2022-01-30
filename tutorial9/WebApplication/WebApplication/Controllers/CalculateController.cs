using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication.Tutorial9.Exercise;

namespace WebApplication.Controllers
{
    public class CalculateController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Plus(int a, int b)
        {
            var service = new PlusMinusServiceSoapClient("PlusMinusServiceSoap");
            var res = service.Plus(a, b);
            return RedirectToAction("Result", "Calculate", new { result = a + "+" + b + "=" + res });
        }
        public ActionResult Minus(int a, int b)
        {
            var service = new PlusMinusServiceSoapClient("PlusMinusServiceSoap");
            var res = service.Minus(a, b);
            return RedirectToAction("Result", "Calculate", new { result = a + "-" + b + "=" + res });
        }

        public ActionResult PlusMinus(int a, int b)
        {
            var service = new PlusMinusServiceSoapClient("PlusMinusServiceSoap");
            var res = service.PlusMinus(a, b);
            return RedirectToAction("Result", "Calculate", new { result = a + "+" + b + "=" + res.plusResult + ", " + a + "-" + b + "=" + res.minusResult });
        }
        public ActionResult Result(string result)
        {
            ViewBag.Message = result;
            return View();
        }
    }
}