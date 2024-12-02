import React from "react";
import ComponentPanel from "./ComponentPanel";
import DesignArea from "./DesignArea";
import NewAppBar from "./NewAppBar";

export default function Dashboard() {
    return (
        <div>
            <NewAppBar />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "70px",
                    padding: "15px",
                    gap: "15px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "15px",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            flex: "0 0 300px",
                            maxWidth: "100%",
                            height: "auto",
                        }}
                    >
                        <ComponentPanel />
                    </div>
                    <div
                        style={{
                            flex: "1 1 600px",
                            maxWidth: "100%",
                        }}
                    >
                        <DesignArea />
                    </div>
                </div>
            </div>
        </div>
    );
}
