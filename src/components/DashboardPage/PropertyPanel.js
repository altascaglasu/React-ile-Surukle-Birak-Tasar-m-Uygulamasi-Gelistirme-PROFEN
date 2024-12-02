import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import './PropertyPanel.css'

export default function PropertyPanel({ selectedComponent, openDrawer, handleCloseDrawer, handleSave }) {
    const [position, setPosition] = useState({
        left: 0,
        top: 0,
    });
    console.log(position, selectedComponent?.x)
    const [dimensions, setDimensions] = useState({
        width: 100,
        height: 50,
    });
    const [style, setStyle] = useState({
        backgroundColor: selectedComponent?.backgroundColor,
        borderColor: selectedComponent?.borderColor,
    });
    useEffect(() => {
        if (selectedComponent) {
            setPosition({
                left: selectedComponent.x || 0,
                top: selectedComponent.y || 0,
            });
            setDimensions({
                width: selectedComponent.width || 100,
                height: selectedComponent.height || 50
            })
            setStyle({
                backgroundColor: selectedComponent.backgroundColor,
                borderColor: selectedComponent.borderColor,
            })
        }
    }, [selectedComponent]);

    const onSubmit = () => {
        const componentProp = {
            ...selectedComponent,
            x: position.left,
            y: position.top,
            ...style,
            ...dimensions
        }
        handleSave(componentProp)
    }
    return (
        <div>
            <Drawer anchor='right' open={openDrawer} onClose={handleCloseDrawer} >
                <div className="property-panel">
                    <h2>Bileşen Özellikleri</h2>

                    <div className="input-group">
                        <label>Konum - X (px):</label>
                        <input
                            type="number"
                            value={position.left}
                            onChange={(e) => setPosition({ ...position, left: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="input-group">
                        <label>Konum - Y (px):</label>
                        <input
                            type="number"
                            value={position.top}
                            onChange={(e) => setPosition({ ...position, top: parseInt(e.target.value) })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Width(px):</label>
                        <input
                            type="number"
                            value={dimensions.width}
                            onChange={(e) => setDimensions({ ...dimensions, width: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="input-group">
                        <label>Height(px):</label>
                        <input
                            type="number"
                            value={dimensions.height}
                            onChange={(e) => setDimensions({ ...dimensions, height: parseInt(e.target.value) })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Background Color:</label>
                        <input
                            type="color"
                            value={style.backgroundColor}
                            onChange={(e) => setStyle({ ...style, backgroundColor: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <label>Border Color:</label>
                        <input
                            type="color"
                            value={style.borderColor}
                            onChange={(e) => setStyle({ ...style, borderColor: e.target.value })}
                        />
                    </div>

                    <button className='save-button' onClick={onSubmit}>Save</button>

                </div>
            </Drawer>
        </div>
    );
}