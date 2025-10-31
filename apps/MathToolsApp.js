function MathToolsApp() {
  try {
    const [activeTool, setActiveTool] = React.useState('calculator');
    const [calcInput, setCalcInput] = React.useState('');
    const [calcHistory, setCalcHistory] = React.useState([]);
    const [matrixA, setMatrixA] = React.useState([[1, 2], [3, 4]]);
    const [matrixB, setMatrixB] = React.useState([[5, 6], [7, 8]]);
    const [matrixResult, setMatrixResult] = React.useState(null);
    const [equation, setEquation] = React.useState('x² + 5x + 6 = 0');
    const [equationSolution, setEquationSolution] = React.useState(null);

    const tools = [
      { id: 'calculator', name: 'Calculator', icon: '🧮' },
      { id: 'matrix', name: 'Matrix Calculator', icon: '🔢' },
      { id: 'equation', name: 'Equation Solver', icon: '📐' },
      { id: 'graph', name: 'Graph Plotter', icon: '📊' },
      { id: 'converter', name: 'Unit Converter', icon: '🔄' },
      { id: 'logic', name: 'Logic Gates', icon: '💡' }
    ];

    const calculate = (expression) => {
      try {
        // Simple calculator implementation
        const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
        if (sanitized !== expression) {
          return 'Invalid characters';
        }
        
        // Use Function constructor for safe evaluation
        const result = Function('"use strict"; return (' + sanitized + ')')();
        return result.toString();
      } catch (error) {
        return 'Error';
      }
    };

    const handleCalculation = () => {
      if (!calcInput) return;
      
      const result = calculate(calcInput);
      const historyItem = {
        expression: calcInput,
        result: result,
        timestamp: new Date()
      };
      
      setCalcHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      setCalcInput(result);
    };

    const matrixOperations = {
      add: () => {
        const result = matrixA.map((row, i) => 
          row.map((val, j) => val + matrixB[i][j])
        );
        setMatrixResult(result);
      },
      subtract: () => {
        const result = matrixA.map((row, i) => 
          row.map((val, j) => val - matrixB[i][j])
        );
        setMatrixResult(result);
      },
      multiply: () => {
        const result = [];
        for (let i = 0; i < matrixA.length; i++) {
          result[i] = [];
          for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
              sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
          }
        }
        setMatrixResult(result);
      },
      determinant: (matrix) => {
        const det = (m) => {
          if (m.length === 1) return m[0][0];
          if (m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
          
          let result = 0;
          for (let i = 0; i < m.length; i++) {
            const minor = m.slice(1).map(row => 
              row.filter((_, j) => j !== i)
            );
            result += Math.pow(-1, i) * m[0][i] * det(minor);
          }
          return result;
        };
        return det(matrix);
      }
    };

    const solveQuadratic = () => {
      try {
        // Parse equation like "ax² + bx + c = 0"
        const match = equation.match(/([+-]?\d*\.?\d*)\s*x²\s*([+-]\s*\d*\.?\d*)\s*x\s*([+-]\s*\d+\.?\d*)/);
        if (!match) {
          setEquationSolution('Invalid equation format');
          return;
        }

        const a = parseFloat(match[1].replace(/\s/g, '') || '1');
        const b = parseFloat(match[2].replace(/\s/g, '') || '0');
        const c = parseFloat(match[3].replace(/\s/g, '') || '0');

        const discriminant = b * b - 4 * a * c;
        
        if (discriminant > 0) {
          const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          setEquationSolution(`x₁ = ${x1.toFixed(3)}, x₂ = ${x2.toFixed(3)}`);
        } else if (discriminant === 0) {
          const x = -b / (2 * a);
          setEquationSolution(`x = ${x.toFixed(3)}`);
        } else {
          const real = (-b / (2 * a)).toFixed(3);
          const imag = (Math.sqrt(-discriminant) / (2 * a)).toFixed(3);
          setEquationSolution(`x₁ = ${real} + ${imag}i, x₂ = ${real} - ${imag}i`);
        }
      } catch (error) {
        setEquationSolution('Error solving equation');
      }
    };

    const updateMatrix = (matrix, setMatrix, row, col, value) => {
      const newMatrix = matrix.map((r, i) => 
        r.map((c, j) => (i === row && j === col) ? parseFloat(value) || 0 : c)
      );
      setMatrix(newMatrix);
    };

    return (
      <div className="flex h-full" data-file="apps/MathToolsApp.js">
        <div className="w-48 border-r border-white/10">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Math Tools</h2>
            <div className="space-y-2">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    activeTool === tool.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{tool.icon}</span>
                  <span className="text-sm">{tool.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {activeTool === 'calculator' && (
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-6">Scientific Calculator</h3>
              
              <div className="glass-effect rounded-xl p-4 mb-4">
                <input
                  type="text"
                  value={calcInput}
                  onChange={(e) => setCalcInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCalculation()}
                  className="w-full text-2xl font-mono bg-transparent text-right outline-none"
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(btn => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === '=') {
                        handleCalculation();
                      } else {
                        setCalcInput(prev => prev + btn);
                      }
                    }}
                    className={`p-4 rounded-lg font-semibold text-lg transition-colors ${
                      btn === '=' 
                        ? 'bg-[var(--primary-color)] text-white hover:opacity-90'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {['sin', 'cos', 'tan', 'log', 'sqrt', 'pow', 'pi', 'e'].map(func => (
                  <button
                    key={func}
                    onClick={() => setCalcInput(prev => prev + func + '(')}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 text-sm"
                  >
                    {func}()
                  </button>
                ))}
              </div>

              {calcHistory.length > 0 && (
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold mb-3">History</h4>
                  <div className="space-y-2">
                    {calcHistory.map((item, idx) => (
                      <div key={idx} className="text-sm opacity-70">
                        {item.expression} = {item.result}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTool === 'matrix' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Matrix Calculator</h3>
              
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Matrix A</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {matrixA.map((row, i) => 
                      row.map((val, j) => (
                        <input
                          key={`a-${i}-${j}`}
                          type="number"
                          value={val}
                          onChange={(e) => updateMatrix(matrixA, setMatrixA, i, j, e.target.value)}
                          className="w-16 p-2 bg-white/10 rounded text-center"
                        />
                      ))
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                  <button onClick={matrixOperations.add} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">A + B</button>
                  <button onClick={matrixOperations.subtract} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">A - B</button>
                  <button onClick={matrixOperations.multiply} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">A × B</button>
                  <button onClick={() => setMatrixResult([[matrixOperations.determinant(matrixA)]])} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">det(A)</button>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Matrix B</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {matrixB.map((row, i) => 
                      row.map((val, j) => (
                        <input
                          key={`b-${i}-${j}`}
                          type="number"
                          value={val}
                          onChange={(e) => updateMatrix(matrixB, setMatrixB, i, j, e.target.value)}
                          className="w-16 p-2 bg-white/10 rounded text-center"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {matrixResult && (
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Result</h4>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixResult[0].length}, minmax(0, 1fr))` }}>
                    {matrixResult.map((row, i) => 
                      row.map((val, j) => (
                        <div key={`r-${i}-${j}`} className="p-2 bg-white/10 rounded text-center">
                          {val.toFixed(2)}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTool === 'equation' && (
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-6">Equation Solver</h3>
              
              <div className="glass-effect rounded-xl p-4 mb-4">
                <label className="block text-sm font-medium mb-2">Quadratic Equation</label>
                <input
                  type="text"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  className="w-full p-3 bg-white/10 rounded-lg font-mono"
                  placeholder="ax² + bx + c = 0"
                />
              </div>

              <button
                onClick={solveQuadratic}
                className="w-full px-4 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 mb-4"
              >
                Solve Equation
              </button>

              {equationSolution && (
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Solution</h4>
                  <div className="font-mono text-lg">{equationSolution}</div>
                </div>
              )}

              <div className="mt-6 glass-effect rounded-xl p-4">
                <h4 className="font-semibold mb-3">Formula</h4>
                <div className="text-center text-lg font-mono">
                  x = (-b ± √(b² - 4ac)) / 2a
                </div>
              </div>
            </div>
          )}

          {activeTool === 'graph' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Graph Plotter</h3>
              <div className="glass-effect rounded-xl p-8 h-96 flex items-center justify-center">
                <div className="text-center opacity-50">
                  <div className="icon-line-chart text-6xl mb-4"></div>
                  <p>Interactive graph plotter coming soon</p>
                  <p className="text-sm mt-2">Plot functions, analyze curves, and explore mathematical relationships</p>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'converter' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Unit Converter</h3>
              <div className="glass-effect rounded-xl p-8 h-96 flex items-center justify-center">
                <div className="text-center opacity-50">
                  <div className="icon-refresh-cw text-6xl mb-4"></div>
                  <p>Unit converter coming soon</p>
                  <p className="text-sm mt-2">Convert between length, weight, temperature, and more</p>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'logic' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Logic Gates Simulator</h3>
              <div className="glass-effect rounded-xl p-8 h-96 flex items-center justify-center">
                <div className="text-center opacity-50">
                  <div className="icon-cpu text-6xl mb-4"></div>
                  <p>Logic gates simulator coming soon</p>
                  <p className="text-sm mt-2">Build and test digital logic circuits</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('MathToolsApp error:', error);
    return null;
  }
}