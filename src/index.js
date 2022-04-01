import $ from "jQuery";
$(".product").on("click", function (e) {
  $(".product .productExtension").css("display", "none");
  $(this).children(".productExtension").css("display", "block");
  if (e.target.classList.contains("closeProductExtension")) {
    $(".productExtension").css("display", "none");
  }
});

$(document).ready(function () {
  console.log("ready!");
  $("#test").removeClass("hide");
});

/*
---------------------------------------------------------------------------
*/

function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

/*
---------------------------------------------------------------------------
*/

function extraerErrores(msj) {
  let erroresHtml = "";

  if (isJson(msj)) {
    const respuesta = JSON.parse(msj);

    if ("errors" in respuesta) {
      const errores = JSON.parse(msj).errors;

      const totalErrores = Object.keys(errores).length;
      let cont = 1;
      for (const key in errores) {
        erroresHtml += `${key}: ${errores[key]}`;
        if (totalErrores > 1 && cont < totalErrores) {
          erroresHtml += "<br>";
        }
        cont += 1;
      }
    } else if ("message" in respuesta) {
      erroresHtml += respuesta.message;
    } else {
      erroresHtml += respuesta;
    }
  } else {
    erroresHtml += msj;
  }

  return erroresHtml;
}

/*
---------------------------------------------------------------------------
---------------------------------------------------------------------------
---------------------------------------------------------------------------
*/

const msj =
  '{"message":"The given data was invalid.","errors":{"ax":["e1","e2"],"cer":["e1","e2"], "foo":["a1","a2"]}}';

const erroresHtml = extraerErrores(msj);

console.log("errores:" + erroresHtml);
