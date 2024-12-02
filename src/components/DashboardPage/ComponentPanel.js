import React from "react";

const components = [
    { id: "image-upload", label: "Image Upload" },
    { id: "checkbox", label: "Checkbox" },
    { id: "input", label: "Text Input" },
];

export default function ComponentPanel() {
    const handleDragStart = (e, componentType) => {
        e.dataTransfer.setData("componentType", componentType);
    };

    return (
        <div
            style={{
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "15px",
                width: "100%",
                minWidth: "250px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h3 style={{ textAlign: "center", margin: "10px 0" }}>Components</h3>

            {components.map((comp) => (
                <div
                    key={comp.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, comp.id)}
                    style={{
                        padding: "12px",
                        margin: "8px 0",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        cursor: "grab",
                        textAlign: "center",
                    }}
                >
                    {comp.label}
                </div>
            ))}
        </div>
    );
}
