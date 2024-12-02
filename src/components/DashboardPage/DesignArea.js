import React, { useState, useEffect, useRef } from "react";
import PropertyPanel from "./PropertyPanel";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { enqueueSnackbar } from "notistack";

export default function DesignArea() {
    const [components, setComponents] = useState([]);
    const [draggedComponent, setDraggedComponent] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false)
    const ref = useRef()
    const [uploadedFile, setUploadedFile] = useState(null)
    const handleOpenDrawer = (comp) => {
        const selectedComp = components.find(item => item.id === comp.id);
        setOpenDrawer(true);

        setSelectedComponent(selectedComp)
    }
    const handleCloseDrawer = () => { setOpenDrawer(false) }

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("designArea"));
        if (savedData) setComponents(savedData);
    }, []);

    useEffect(() => {
        console.log("useEffect", components)
        localStorage.setItem("designArea", JSON.stringify(components));
    }, [components]);

    // komponent listesinden sürüklenip bırakılan bileşenin yerinin ve gerekli değerlerinin hazırlanır
    const handleDrop = (e) => {
        console.log("drop", components)
        e.preventDefault();
        const initComponentsProp = {
            borderColor: 'black',
            backgroundColor: "#fff",
            width: 200,
            height: 60,
        }

        const designAreaRect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - designAreaRect.left - dragOffset.x;
        const offsetY = e.clientY - designAreaRect.top - dragOffset.y;

        if (draggedComponent) {
            const updatedComponents = components.map((comp) =>
                comp.id === draggedComponent.id
                    ? { ...comp, x: offsetX, y: offsetY }
                    : comp
            );
            setComponents(updatedComponents);
            setDraggedComponent(null);
            setDragOffset({ x: 0, y: 0 });
        } else {
            const componentType = e.dataTransfer.getData("componentType");
            if (componentType) {
                const newComponent = {
                    id: `${componentType}-${Date.now()}`,
                    type: componentType,
                    x: offsetX,
                    y: offsetY,
                    content: "",
                    ...initComponentsProp
                };
                setComponents((prev) => [...prev, newComponent]);
            }
        }
    };
    // Design area içerisindeki componentlerin tekrardan yerini değiştirebilmeyi sağlar
    const handleDragOver = (e) => e.preventDefault();

    const handleDragStart = (e, comp) => {
        setDraggedComponent(comp);

        const designAreaRect = e.currentTarget.parentElement.getBoundingClientRect();
        const offsetX = e.clientX - designAreaRect.left - comp.x;
        const offsetY = e.clientY - designAreaRect.top - comp.y;

        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleContentChange = (id, value) => {
        setComponents((prev) =>
            prev.map((comp) =>
                comp.id === id ? { ...comp, content: value } : comp
            )
        );
    };

    const handleDelete = (id) => {
        setComponents((prev) => prev.filter((comp) => comp.id !== id));
    };
    const handleSelectComponent = (comp) => {
        setSelectedComponent(comp);
    };

    // seçilen ve düzenlenen componentin kaydedilip ekrana yansıması gerçekleştirilir.
    const handleSave = (componentProp) => {
        setComponents((prevComponents) =>
            prevComponents.map((component) =>
                component.id === componentProp.id
                    ? { ...component, ...componentProp }
                    : component
            )
        );
    }

    // Yüklenen resmin indirilmesini sağlar
    const handleDownload = () => {
        if (!uploadedFile) return;

        const url = URL.createObjectURL(uploadedFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = uploadedFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                border: "2px dashed gray",
                minHeight: "400px",
                marginLeft: "30px",
                backgroundColor: "#f1f1f1",
                borderRadius: "8px",
                position: "relative",
                overflow: "auto",
                padding: "10px",
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Design Area</h3>

            <PropertyPanel selectedComponent={selectedComponent} openDrawer={openDrawer} handleCloseDrawer={handleCloseDrawer} handleSave={handleSave} />

            {components.map((comp) => (
                <div
                    ref={ref}
                    key={comp.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, comp)}
                    style={{
                        position: "absolute",
                        left: `${comp.x}px`,
                        top: `${comp.y}px`,
                        width: `${comp.width}px` || '40%',
                        height: `${comp.height}px` || '15%',
                        padding: "10px",
                        border: "3px solid black",
                        borderRadius: "8px",
                        borderColor: comp.borderColor || 'black',
                        backgroundColor: comp.backgroundColor || "#fff",
                        cursor: "grab",

                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: 'fit-content', gap: 0 }}>
                        <div>
                            {comp.type === "input" && (
                                <input
                                    onClick={() => handleSelectComponent(comp)}
                                    type="text"
                                    value={comp.content}
                                    onChange={(e) => handleContentChange(comp.id, e.target.value)}
                                    placeholder="Enter text"
                                    style={{ padding: "8px" }}
                                />
                            )}
                            {comp.type === "checkbox" && (
                                <label style={{ display: "flex", alignItems: "center" }}>
                                    <input
                                        onClick={() => handleSelectComponent(comp)}
                                        type="checkbox"
                                        checked={comp.content === "checked"}
                                        onChange={(e) =>
                                            handleContentChange(comp.id, e.target.checked ? "checked" : "")
                                        }
                                        style={{ marginRight: "8px" }}
                                    />
                                    Checkbox
                                </label>
                            )}
                            {comp.type === "image-upload" && (
                                <div>
                                    <input
                                        onClick={() => handleSelectComponent(comp)}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            console.log(file)
                                            if (file) {
                                                setUploadedFile(file)
                                                if (
                                                    file.type === "image/png" ||
                                                    file.type === "image/jpeg"
                                                ) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        handleContentChange(comp.id, event.target.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                } else {
                                                    enqueueSnackbar("Only PNG and JPEG files are allowed.", {
                                                        variant: 'error'
                                                    })

                                                }
                                            }
                                        }}
                                    />
                                    {comp.content && (
                                        <span style={{ cursor: 'pointer' }} title="Download File"> <div style={{ fontSize: '9pt' }} onClick={handleDownload}> {uploadedFile?.name}</div>
                                        </span>


                                    )}
                                </div>
                            )}
                        </div>


                    </div>
                    <IconButton
                        style={{
                            position: "absolute", top: "10px",
                            right: "-30px",
                        }}
                        aria-label="update"
                        onClick={() => handleOpenDrawer(comp)}
                    >
                        <EditIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                    <button
                        onClick={() => handleDelete(comp.id)}
                        style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            background: "red",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                        }}
                    >
                        X
                    </button>
                </div>
            ))
            }                    </div >




    );
}
