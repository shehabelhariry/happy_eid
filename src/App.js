import mug from "./mug.png";
import pattern from "./pattern2.png";
import "./App.css";
import biscuts from "./biscuts.png";
import biscuts2 from "./biscuts2.png";
import petitfour from "./petitfour.png";
import { useEffect, useRef, useState } from "react";

const types = [
  { label: "biscuts", component: biscuts },
  { label: "biscuts2", component: biscuts2 },
  { label: "petitfour", component: petitfour },
];
const lanes = [0, 100, 200, 300];
const step = 50;

function App() {
  const [pos, setPos] = useState(0);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({
    id: 0,
    type: "biscuts",
    pos: -100,
    left: 0,
  });
  const [lose, setLose] = useState(false);
  const targetRef = useRef(null);

  const mugRef = useRef(null);
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight") {
        setPos((old) => {
          const newPos = old + step;
          return newPos > 300 ? old : newPos;
        });
      }
      if (e.code === "ArrowLeft") {
        setPos((old) => {
          const newPos = old - step;
          return newPos < 0 ? old : newPos;
        });
      }
    });
  }, []);

  useEffect(() => {
    if (lose) return;
    const interval = setInterval(() => {
      const mugELement = mugRef.current;
      const targetElement = targetRef.current;
      let isTargetInMug =
        targetElement.style.left === mugELement.style.left &&
        parseInt(targetElement.style.top.replace("px", "")) >= 300;

      if (isTargetInMug) {
        setScore((old) => old + 1);
        const randomType = Math.round(Math.random() * (types.length - 1));
        const randomLane = Math.round(Math.random() * (lanes.length - 1));
        setTarget((old) => ({
          ...old,
          type: types[randomType]?.label,
          pos: -100,
          left: lanes[randomLane],
        }));
      }

      const isTargetPassedMug =
        targetElement.style.left !== mugELement.style.left &&
        parseInt(targetElement.style.top.replace("px", "")) >= 300;

      if (isTargetPassedMug) {
        setLose(true);
        clearInterval(interval);
      }

      setTarget((target) => ({
        ...target,
        pos: target.pos + step,
      }));
    }, 400);
    return () => {
      clearInterval(interval);
    };
  }, [lose]);

  return (
    <div className="App">
      <div className="container" style={{ backgroundImage: `url(${pattern})` }}>
        <div className="main_card">
          <div>
            <h1>عيد فطر سعيد</h1>
            <h3> فكرة لزيادة الانبساط و الفرحة في العيد</h3>
            <div className="operation">
              {score}
              <div className="game_container">
                <div
                  ref={targetRef}
                  key={target.id}
                  className="target"
                  style={{ top: target.pos, left: target.left }}
                >
                  <img
                    alt="target"
                    src={types.find((t) => t.label === target.type)?.component}
                    style={{ width: "100%" }}
                  />
                </div>
                {lose ? (
                  <div className="lose_panel">
                    <p>كفاية سآسآة و لا ايه </p>
                    <button
                      onClick={() => {
                        setScore(0);
                        setLose(false);
                        setTarget({
                          id: 0,
                          type: "biscuts",
                          pos: -100,
                          left: 0,
                        });
                      }}
                    >
                      يالا تاني
                    </button>
                  </div>
                ) : null}
                <div
                  style={{
                    left: pos,
                    display: " inline-block",
                  }}
                  className="mug"
                  ref={mugRef}
                >
                  <img alt="mug" src={mug} />
                </div>
              </div>
            </div>
          </div>
          <div className="mobile_controls">
            <button
              onClick={() => {
                setPos((old) => {
                  const newPos = old - step;
                  return newPos < 0 ? old : newPos;
                });
              }}
            >
              ⬅️
            </button>
            <button
              onClick={() => {
                setPos((old) => {
                  const newPos = old + step;
                  return newPos > 300 ? old : newPos;
                });
              }}
            >
              ➡️
            </button>
          </div>
          <h4>كل عام و انتم بخير</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
