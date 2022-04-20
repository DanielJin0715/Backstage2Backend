// Lets import the fs module to access the fileSystem
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js")({
  domain: "key-c55339a4247259b7d6dc4bd914161fac",
  apiKey: "api.eu.mailgun.net",
});

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;

app.post("/sendmail", (req, res) => {
  mailgun
    .messages()
    .send({
      from: `stage@bksbackstage.io`,
      to: req.body.email,
      subject: "New Registration",
      html: `<!DOCTYPE html>
        <html lang="en">
            <style>
                .form-group{
                    display: block;
                    float: left;
                    width: 100%;
                }
            </style>
            <body>
                <div class="  text-center">
                    <div class="reg-form">
                        <div class="form-group">
                            Name:   ${req.body.name}
                        </div>
                        <div class="form-group">
                            SurName:  ${req.body.surName}
                        </div>
                        <div class="form-group">
                            Email:  ${req.body.email}
                        </div>
                        <div class="form-group">
                            Company:  ${req.body.organization}
                        </div>
                        <div class="form-group">
                            Business:  ${"Business"}
                        </div>
                        <div class="form-group">
                            Country: ${"Country"}
                        </div>
                        <div class="form-group">
                            Note:    ${req.body.message}
                        </div>
                        <div class="form-group">
                            Form Type:  ${"FormType"}
                        </div>
                    </div>             
                </div>
            </body>
      </html>`,
    })
    .then((res) => {
      res.json({ res: "success" });
    })
    .catch((err) => {
      res.json({ res: "failure" });
    });
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
