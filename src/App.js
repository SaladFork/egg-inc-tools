import ChickensRequiredCalculator from 'ChickensRequiredCalculator'
import EggLayRateCalculator from 'EggLayRateCalculator'

function App() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
        <EggLayRateCalculator />
        <ChickensRequiredCalculator />
      </div>
    </div>
  )
}

export default App
