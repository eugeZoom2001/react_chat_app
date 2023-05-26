import React, { useState, useEffect } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("renderd");
  });

  useEffect(() => {
    const id = setInterval(() => {
      console.log("intervalo", count);
      setCount(count + 1);
      // setCount((oldCount) => oldCount + 1); //asi funciona con dependencia []
    }, 2000);
    // This effect depends on the `count` state    }, 1000);

    return () => clearInterval(id);
    //}, []); // 🔴 Bug: `count` is not specified as a dependency count queda en 1 => no se renderiza mas
    // -- pero el use effect se ejecuta cada 2 sec
  }, [count]); // correcto
  //}, []); // correcto con setCount((oldCount) => oldCount + 1)

  return <div>{count}</div>;
};

export default Home;
