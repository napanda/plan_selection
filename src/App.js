import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(
    "[ { 'planName': 'Standard plan', 'price': 0, 'general': true, 'specialist':false, 'physiotherapy':false }, { 'planName': 'Premium plan', 'price': 388, 'general': true, 'specialist':true, 'physiotherapy':true } ]"
  );

  const [validationData, setValidationData] = useState("");
  const [validJson, setValidJson] = useState([]);
  const [canRender, setCanRender] = useState(false);

 
  const handleDataChange = (e) => {
    const text = e.target.value;
    setData(text);
  };
  useEffect(() => {
    setValidationData("");
    setValidJson([]);
    setCanRender(false)

    const jsonStr = data.trim().replace(/'/g, '"');

    //check json
    function isJsonString(str) {
      try {
        return typeof JSON.parse(str) === "object";
      } catch (e) {
        return false;
      }
    }
    if (!isJsonString(jsonStr)) return setValidationData("must be valid JSON.");

    const json = JSON.parse(jsonStr);
    if (!Array.isArray(json))
      return setValidationData("must be valid JSON Array.");
    if (json.length < 1) return setValidationData("array.length must be > 0.");

    let shouldReturn = false;
    json.map((obj, idx) => {
      if (!obj.planName) {
        shouldReturn = true;
        return setValidationData("object.planName must exist.");
      }
      if (!obj.hasOwnProperty('price')) {
        shouldReturn = true;
        return setValidationData("object.price must exist.");
      }
      if (!obj.hasOwnProperty('general')) {
        shouldReturn = true;
        return setValidationData("object.general must exist.");
      }
      if (!obj.hasOwnProperty('specialist')) {
        shouldReturn = true;
        return setValidationData("object.specialist must exist.");
      }
      if (!obj.hasOwnProperty('physiotherapy')) {
        shouldReturn = true;
        return setValidationData("object.physiotherapy must exist.");
      }
      if (obj.hasOwnProperty('planName') && typeof obj.planName !== "string") {
        shouldReturn = true;
        return setValidationData("object.planName must be string.");
      }
      if (obj.hasOwnProperty('price') && typeof obj.price !== "number") {
        shouldReturn = true;
        return setValidationData("object.price must be integer.");
      }
      if (obj.hasOwnProperty('general') && typeof obj.general !== "boolean") {
        shouldReturn = true;
        return setValidationData("object.general must be boolean.");
      }
      if (obj.hasOwnProperty('specialist') && typeof obj.specialist !== "boolean") {
        shouldReturn = true;
        return setValidationData("object.specialist must be boolean.");
      }
      if (obj.hasOwnProperty('physiotherapy') && typeof obj.physiotherapy !== "boolean") {
        shouldReturn = true;
        return setValidationData("object.physiotherapy must be boolean.");
      }
    });
    if (shouldReturn) return;
    
    setValidJson(json);
    
  }, [data]);

  const getResult = () => {
    setCanRender(true)
  }

  return (
    <>
      <h1>Plan Selection</h1>
      <div id="main">
        <div id="inputSection">
          <div className="label">Data</div>
          <textarea value={data} onChange={(e) => handleDataChange(e)} />
          <div className="validation">{validationData}</div>
          <div className="button" onClick={() => getResult()}>Submit</div>
        </div>
        <div id="resultSection">
          <div className="label">Choose a plan</div>
          <div className="planTable">
            <div className="planTableCol">
              <div></div>
              <div>General</div>
              <div>Specialist</div>
              <div>Physiotherapy</div>
            </div>
            {canRender && validJson.map((_plan, _idx) => {
              return (
                <div key={_idx} className="planTableCol">
                  <div>{_plan.planName}</div>
                  <div>	{_plan.general ? 	<span>&#10004;</span> : <span>&#10006;</span> }</div>
                  <div>	{_plan.specialist ? 	<span>&#10004;</span> : <span>&#10006;</span> }</div>
                  <div>	{_plan.physiotherapy ? 	<span>&#10004;</span> : <span>&#10006;</span> }</div>
                  <div><input type="radio" name="selectPlan"></input> HK${_plan.price} / Month</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
