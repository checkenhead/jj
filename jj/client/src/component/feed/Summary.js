import React from 'react'

function Summary({ summarys }) {
    return (
        <div className="summary">
            {
                summarys.map((summary, summaryIndex) => {
                    return (
                        <div key={summaryIndex} className="link" onClick={() => {
                            navigate(`/view/${summary.writer}/${summary.feedid}`);
                        }}>
                            <img src={`http://localhost:8070/images/${summary.filename}`} />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Summary
