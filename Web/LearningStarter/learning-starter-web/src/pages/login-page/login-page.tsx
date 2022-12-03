import "./login-page.css";
import axios from "axios";
import React, { useMemo } from "react";
import { ApiResponse } from "../../constants/types";
import { Formik, Form, Field } from "formik";
import { Button, Header, Image, Input, Modal } from "semantic-ui-react";
import { useAsyncFn } from "react-use";
import { PageWrapper } from "../../components/page-wrapper/page-wrapper";
import { loginUser } from "../../authentication/authentication-services";
import { Link } from "react-router-dom";
import { RegisterPage } from "../signup-page/sign-up";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";


const baseUrl = process.env.PUBLIC_URL;

type LoginRequest = {
  userName: string;
  password: string;
};

type LoginResponse = ApiResponse<boolean>;

type FormValues = LoginRequest;

//This is a *fairly* basic form
//The css used in here is a good example of how flexbox works in css
//For more info on flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
export const LoginPage = () => {
  const initialValues = useMemo<FormValues>(
    () => ({
      userName: "",
      password: "",
    }),
    []
  );
  const history = useHistory();
  const [, submitLogin] = useAsyncFn(async (values: LoginRequest) => {
    if (baseUrl === undefined) {
      return;
    }

    const response = await axios.post<LoginResponse>(
      `${baseUrl}/api/authenticate`,
      values
    );
    

    if (response.data.data) {
      console.log("Successfully Logged In!");
      loginUser();
      history.push(routes.home);
    }
    else{
      alert("Invalid Username or Password!");
    }
  }, []);

  const [open, setOpen] = React.useState(false)


  return (
    <PageWrapper>
      <div className="flex-box-centered-content-login-page">
        <div className="login-form">
          <Formik initialValues={initialValues} onSubmit={submitLogin}>
            <Form>
              <div>
                <div>
                  <div className="field-label">
                    <label htmlFor="userName">UserName</label>
                  </div>
                  <Field className="field" id="username" name="username">
                    {({ field }) => <Input {...field} />}
                  </Field>
                </div>
                <div>
                  <div className="field-label">
                    <label htmlFor="password">Password</label>
                  </div>
                  <Field className="field" id="password" name="password">
                    {({ field }) => <Input type="password" {...field} />}
                  </Field>
                </div>
                <div className="button-container-login-page">
                  <Button className="login-button" type="submit">
                    Login
                  </Button>
                  {/* <Link to={`/signup`}>
                    <Button>Sign Up</Button>
                  </Link> */}


                  <Modal
                  className="ui modal active small"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button>Sign Up</Button>}
                  >
                    <Modal.Header>Sign Up</Modal.Header>
                    <Modal.Content>
                      
                      <Modal.Description>
                        <RegisterPage />
                      </Modal.Description>
                    </Modal.Content>
                   
                  </Modal>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </PageWrapper>
  );
};
