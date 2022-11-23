import React from "react";
import { Input, TextArea } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";
import "../../App.css";
import "./ContactForm.css";

export const ContactForm = () => {
  return (
    <div>
      <section className="contact">
        <div className="content">
          <h2>Contact Us</h2>
        </div>
        <div className="container">
          <div className="contactInfo">
            <div className="box">
              <div className="icon">
                <i className="location arrow icon"></i>
              </div>
              <div className="text">
                <h3>Address</h3>
                <p>
                  1300 Hooks Dr, Apt 7 <br /> Hammond, Louisiana-70401
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="envelope icon"></i>
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>ChickenCurry@gmail.com</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="phone icon"></i>
              </div>
              <div className="text">
                <h3>Phone</h3>
                <p> 985-222-5131</p>
              </div>
            </div>
          </div>
          <div>
        <Formik>
            <Form>
              <h2>Send Message</h2>
              <div className="inputBox">
                <Input type="text" name="" required="required">
                  <span>Full Name</span>
                </Input>
              </div>
              <div className="inputBox">
                <Input type="text" name="" required="required">
                  <span>Email</span>
                </Input>
              </div>
              <div className="inputBox">
                <TextArea required="required"> </TextArea>
                <span>Type your Message...</span>
              </div>
              <div className="inputbox">
                <Input type="submit" name="" value="send"></Input>{" "}
              </div>
            </Form>
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};
