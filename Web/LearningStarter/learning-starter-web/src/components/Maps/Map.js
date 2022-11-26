import React from "react";
import "../../App.css";
import { Button } from "../navigation/button";
import "./Map.css";

export const Map = () => {
  return (
    <div
      class="ui embed"
      data-source="google"
      data-url=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.2783583064647!2d-90.47983468447251!3d30.513167103231456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8627229037299ec7%3A0x44ffd30aac5f94d!2s1300%20Hooks%20Dr%2C%20Hammond%2C%20LA%2070401!5e0!3m2!1sen!2sus!4v1669066650693!5m2!1sen!2sus"
     
      data-placeholder="/images/bear-waving.jpg"
    ></div>
  );
};
