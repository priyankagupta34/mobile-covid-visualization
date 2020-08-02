import React from 'react';
import HeaderComponent from './components/header-component/HeaderComponent';

function App() {
  return (
    <div>
      <div className="compatibility_mobile">
        <header>
          <HeaderComponent />
        </header>


        <article>

        </article>
      </div>

      <div className="no_compatibility_mobile">
        <div className="no_compat">
          <div>This is designed just for mobile</div>
          <div>To continue viewing on desktop device please below.</div>
          <a href="https://covid-visualization-live.netlify.app/" >covid-visualization</a>
        </div>
      </div>
    </div>
  );
}

export default App;
