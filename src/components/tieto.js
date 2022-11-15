import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Tieto() {
    const [ok, setOK] = useState("");

   useEffect(()=>{
        axios.get("http://localhost:8080/data")
        .then(response => response.data)
        .then((result)=>{
            setOK(result);
        })
    }, [])


    return (
        <div>
        <h3>Tieto</h3>
            <div>
                ok: {ok}
            </div>
        </div>
      );
}