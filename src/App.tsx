import { MouseEventHandler, useRef, useState } from 'react';
import './App.css';

function App() {
  const [isGrabbing, setIsGrabbing] = useState(false);
  
  const ref = useRef<HTMLDivElement>(null);

  let position = { scrollTop: 0, scrollLeft: 0, clickX: 0, clickY: 0 };
  
  const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (ref.current) {
      const moveDistanceX = e.clientX - position.clickX;
      const moveDistanceY = e.clientY - position.clickY;

      ref.current.scrollTop = position.scrollTop - moveDistanceY;
      ref.current.scrollLeft = position.scrollLeft - moveDistanceX;
    }
  };
  
  const mouseUpHandler: MouseEventHandler<HTMLDivElement> = () => {
    if (ref.current) {
      setIsGrabbing(false);
      
      document.removeEventListener('mousemove', mouseMoveHandler as () => void);
      document.removeEventListener('mouseup', mouseUpHandler as () => void);
    }
  };

  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (ref.current) {
      setIsGrabbing(true);

      position = {
        scrollLeft: ref.current.scrollLeft,
        scrollTop: ref.current.scrollTop,
        clickX: e.clientX,
        clickY: e.clientY,
      };
      
      document.addEventListener('mousemove', mouseMoveHandler as () => void);
      document.addEventListener('mouseup', mouseUpHandler as () => void);
    }
  };

  return (
    <main>
      <div
        ref={ref}
        onMouseDown={mouseDownHandler}
        className="canvas"
        style={isGrabbing ? {
          cursor: 'grabbing',
          userSelect: 'none',
        } : {}}
      >
        <div className="node" style={{background: '#fefefe'}}>1</div>
        <div className="node" style={{background: '#dcdcdc'}}>2</div>
        <div className="node" style={{background: '#fefefe'}}>3</div>
        <div className="node" style={{background: '#dcdcdc'}}>4</div>
        <div className="node" style={{background: '#fefefe'}}>5</div>
        <div className="node" style={{background: '#dcdcdc'}}>6</div>
        <div className="node" style={{background: '#fefefe'}}>7</div>
        <div className="node" style={{background: '#dcdcdc'}}>8</div>
        <div className="node" style={{background: '#fefefe'}}>9</div>
        <div className="node" style={{background: '#dcdcdc'}}>10</div>
      </div>
    </main>
  );
}

export default App;
