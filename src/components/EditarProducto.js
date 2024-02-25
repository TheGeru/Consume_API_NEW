import { URL_API_PRODUCTOS, URL_IMAGES } from "../config/rutas";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function EditarProducto() {
    const navigate = useNavigate();
    const params = useParams();
    const [id, setId] = useState(params.id);
    const [mensaje, setMensaje] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [foto, setFoto] = useState(null);
    const [rutaFoto, setRutaFoto] = useState("");

    useEffect(()=>{
        async function buscarPorId(){
            var res = await axios.get(URL_API_PRODUCTOS +"/buscarProductoPorId/" + params.id)
            console.log(res.data);
            setId(res.data.id)
            setNombre(res.data.nombre)
            setPrecio(res.data.precio)
            setFoto(res.data.foto)
            setRutaFoto( URL_IMAGES + res.data.foto)
        }
        buscarPorId();
    },[params.id])

    async function editarDatos(e){

        e.preventDefault();
        const formData = new FormData();
        formData.append("id",id);
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("foto", foto);
        const res = await axios.post( URL_API_PRODUCTOS + "/editarPr", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        setMensaje(res.data);
        setTimeout(() => {
            setMensaje("");
        }, 3000);
        if(res.status === 200){
            navigate("/productos")
        }
    }

    return (
        <div className="container mt-5">
            <div className="text-danger"><h2>{mensaje}</h2></div>
            <form onSubmit={editarDatos}>
                <div className="card">
                    <div className="card-header">
                        <h1>Editar producto</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3" type="text" name="nombre" id="nombre" placeholder="Nombre" autoFocus value={nombre} onChange={(e)=>setNombre(e.target.value)} ></input>
                        <input className="form-control mb-3" type="text" name="precio" id="precio" placeholder="Precio" value={precio} onChange={(e)=>setPrecio(e.target.value)}></input>
                        <input className="form-control mb-3" type="file" name="foto" id="foto" placeholder="Foto" onChange={(e)=>setFoto(e.target.files[0])}></input>
                        <img src={rutaFoto} alt={nombre} width="100" height="100" />
                    </div>
                    <div className="card-footer">
                        <button className=" form-control btn btn-primary" type="submit">Editar</button>
                    </div>
                </div>
            </form>
        </div>
    );

}