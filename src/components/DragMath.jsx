import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import * as math from 'mathjs';

import ColorSelectorNode from './ColorSelectorNode';

// import './index.css';

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
    selectorNode: ColorSelectorNode,
    numberInput: ({ data, isConnectable, id }) => {
        return (
            <div className='p-4 bg-white'>
                <label>Enter Number</label>
                <input className="form-control" type="number" onChange={e => data.onChange(parseInt(e.target.value))} />
                <Handle
                    type="source"
                    position={Position.Right}
                    id={id}
                    style={{ top: 10, background: '#555' }}
                    isConnectable={isConnectable}
                />
            </div>
        )
    },
    function: ({ data, isConnectable }) => {
        return (
            <div className='p-4 bg-white'>
                <label>Enter Function</label>
                <input className="form-control" type="text" onChange={e => data.onChange(e.target.value)} />
                <Handle
                    type="source"
                    position={Position.Right}
                    id='functionout'
                    style={{ top: 10, background: '#555' }}
                    isConnectable={isConnectable}
                />
                <Handle
                    type="target"
                    position={Position.Left}
                    id='functionin'
                    style={{ top: 10, background: '#555' }}
                    isConnectable={isConnectable}
                />
            </div>
        )
    },
    mathOp: ({ data, isConnectable }) => {
        return (
            <div className='p-4 bg-white'>
                <label>Math Operation</label>
                <select className="form-control" onChange={e => data.onChange(e.target.value)}>
                    <option value="">Select</option>
                    <option value="add">Add</option>
                    <option value="sub">Subtract</option>
                    <option value="mul">Multiply</option>
                    <option value="div">Divide</option>
                </select>
                <Handle
                    type="target"
                    position={Position.Left}
                    id="num1"
                    style={{ top: 10, background: '#555' }}
                    isConnectable={true}
                    onConnect={(params) => console.log('handle onConnect', params)}
                />
                <Handle
                    type="target"
                    position={Position.Left}
                    id="num2"
                    style={{ bottom: 10, background: '#555' }}
                    isConnectable={true}
                    onConnect={(params) => console.log('handle onConnect', params)}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id="result"
                    style={{ bottom: 10, background: '#555' }}
                    isConnectable={isConnectable}
                />
            </div>
        )
    },
    result: ({ data, isConnectable }) => {
        return (
            <div className='p-4 bg-white'>
                <h1>{data.result}</h1>
                <Handle
                    type="target"
                    position={Position.Left}
                    id="resulto"
                    style={{ bottom: 10, background: '#555' }}
                    isConnectable={true}
                />
            </div>
        )
    }
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const DragMath = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [op, setOp] = useState('');
    const [result, setResult] = useState(0);
    const [x, setX] = useState(0);
    const [fx, setFx] = useState('');

    const performOperation = () => {
        if (op === 'add') {
            setResult(num1 + num2);
        }
        else if (op === 'sub') {
            setResult(num1 - num2);
        }
        else if (op === 'mul') {
            setResult(num1 * num2);
        }
        else if (op === 'div') {
            setResult(num1 / num2);
        }

        console.log('result', result);

    }

    const simplifyFunction = () => {
        try {
            const sim = math.simplify(fx);
            setResult(sim.evaluate({ x }));
        } catch (error) {
            // setResult('Invalid math function');
            console.log('error', error);
        }
    }

    useEffect(() => {
        performOperation();
    }, [op])

    useEffect(() => {
        simplifyFunction();
    }, [x, fx])


    useEffect(() => {


        setNodes([
            {
                id: '6',
                type: 'numberInput',
                data: { onChange: setX, id: 'x1' },
                position: { x: -200, y: 400 },
                sourcePosition: 'right',
            },
            {
                id: '1',
                type: 'numberInput',
                data: { onChange: setNum1, id: 'num1i' },
                position: { x: 0, y: 20 },
                sourcePosition: 'right',
            },
            {
                id: '5',
                type: 'numberInput',
                data: { onChange: setNum2, id: 'num2i' },
                position: { x: 0, y: 200 },
                sourcePosition: 'right',
            },
            {
                id: '4',
                type: 'function',
                data: { onChange: setFx },
                position: { x: 100, y: 600 },
                sourcePosition: 'right',
            },
            {
                id: '2',
                type: 'mathOp',
                data: { onChange: setOp },
                style: { border: '1px solid #777', padding: 10 },
                position: { x: 300, y: 50 },
            },
            {
                id: '3',
                type: 'result',
                data: { result },
                style: { border: '1px solid #777', padding: 10 },
                position: { x: 600, y: 50 },
            }
        ]);

        setEdges([
            {
                id: 'num1i-num1',
                source: '1',
                target: '2',
                sourceHandle: 'num1i',
                animated: true,
                style: { stroke: '#fff' },
            },
            
            {
                id: 'result-resulto',
                source: '2',
                target: '3',
                sourceHandle: 'result',
                animated: true,
                style: { stroke: '#fff' },
            },
            {
                id: 'functionout-resultto',
                source: '6',
                target: '4',
                sourceHandle: 'result',
                animated: true,
                style: { stroke: '#fff' },
            },
            {
                id: 'x1-functionin',
                source: '4',
                target: '3',
                sourceHandle: 'result',
                animated: true,
                style: { stroke: '#fff' },
            },
            {
                id: 'num2i-num2',
                source: '5',
                target: '2',
                sourceHandle: 'num2i',
                animated: true,
                style: { stroke: '#fff' },
            },
        ]);
    }, [result]);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
        []
    );
    return (
        <div style={{ width: 1400, height: 800 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                style={{ background: bgColor }}
                nodeTypes={nodeTypes}
                connectionLineStyle={connectionLineStyle}
                snapToGrid={true}
                snapGrid={snapGrid}
                defaultViewport={defaultViewport}
                fitView
                attributionPosition="bottom-left"
            >
                <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'selectorNode') return bgColor;
                        if (n.type === 'output') return '#ff0072';
                    }}
                    nodeColor={(n) => {
                        if (n.type === 'selectorNode') return bgColor;
                        return '#fff';
                    }}
                />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default DragMath;
