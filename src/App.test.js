import React from "react";
import { mount } from "enzyme";
import App from "./App";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("Plan Selection Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  test("render the title of Plan Selection", () => {
    expect(wrapper.find("h1").text()).toContain("Plan Selection");
  });

  test("validation message of json = empty string", () => {
    wrapper.find("textarea").simulate("change", { target: { value: "" } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "must be valid JSON."
    );
  });

  test("validation message of json with array size < 0", () => {
    wrapper.find("textarea").simulate("change", { target: { value: "[]" } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "array.length must be > 0."
    );
  });
  test("validation message of object.planName is not existed", () => {
    let arr = [];
    arr.push({ 'price': 0, 'general': true, 'specialist':false, 'physiotherapy':false });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.planName must exist."
    );
  });
  test("validation message of object.planName is not string", () => {
    let arr = [];
    for (let i = 0; i < 2; i++) {
      arr.push({ 'planName': 1, 'price': 0, 'general': true, 'specialist':false, 'physiotherapy':false });
    }
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.planName must be string."
    );
  });
  test("validation message of object.price is not existed", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'general': true, 'specialist':false, 'physiotherapy':false });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.price must exist."
    );
  });
  test("validation message of object.price is not number", () => {
    let arr = [];
    for (let i = 0; i < 2; i++) {
      arr.push({ 'planName': 'Plan A', 'price': 'aa', 'general': true, 'specialist':false, 'physiotherapy':false });
    }
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.price must be integer."
    );
  });
  test("validation message of object.general is not existed", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 0, 'specialist':false, 'physiotherapy':false });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.general must exist."
    );
  });
  test("validation message of object.general is not boolean", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 0, 'general': 1, 'specialist':false, 'physiotherapy':false });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.general must be boolean."
    );
  });
  test("validation message of object.specialist is not existed", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 0, 'general': true, 'physiotherapy':false });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.specialist must exist."
    );
  });
  test("validation message of object.specialist is not boolean", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 0, 'general': true, 'specialist':'a', 'physiotherapy':false });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.specialist must be boolean."
    );
  });
  test("validation message of object.physiotherapy is not existed", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 0, 'general': true, 'specialist':false });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.physiotherapy must exist."
    );
  });
  test("validation message of object.physiotherapy is not boolean", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 0, 'general': true, 'specialist': false, 'physiotherapy':123 });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    expect(wrapper.find(".validation").at(0).text()).toEqual(
      "object.physiotherapy must be boolean."
    );
  });

  test("get result of valid json array of length 1", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 100, 'general': true, 'specialist': false, 'physiotherapy': true });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    wrapper.find(".button").simulate("click");
    const col = wrapper.find(".planTableCol");
    expect(col).toHaveLength(2);
  });

  test("get result of valid json array of length 2", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 100, 'general': true, 'specialist': false, 'physiotherapy': true }, { 'planName': 'Plan B', 'price': 1500, 'general': true, 'specialist': true, 'physiotherapy': true });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    wrapper.find(".button").simulate("click");
    const col = wrapper.find(".planTableCol");
    expect(col).toHaveLength(3);
  });
  test("get result of valid json array of length 3", () => {
    let arr = [];
    arr.push({ 'planName': 'Plan A', 'price': 100, 'general': true, 'specialist': false, 'physiotherapy': true }, { 'planName': 'Plan B', 'price': 1500, 'general': true, 'specialist': true, 'physiotherapy': true }, { 'planName': 'Plan C', 'price': 15000, 'general': true, 'specialist': true, 'physiotherapy': true });
    arr = JSON.stringify(arr);
    wrapper.find("textarea").simulate("change", { target: { value: arr } });
    wrapper.find(".button").simulate("click");
    const col = wrapper.find(".planTableCol");
    expect(col).toHaveLength(4);
  });

});
