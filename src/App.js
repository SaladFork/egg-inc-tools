import Button from 'app/components/Button'
import ButtonGroup from 'app/components/ButtonGroup'
import Input from 'app/components/Input'
import {
  displayValue,
  displayValueShort,
  parseValueString,
} from 'app/components/utils/suffixes'
import { useState, useMemo } from 'react'

function App() {
  const [eggCountValue, setEggCountValue] = useState('')
  const [contractLength, setContractLength] = useState(null)
  const [contractLengthUnit, setContractLengthUnit] = useState('days')

  const eggCount = useMemo(() => parseValueString(eggCountValue), [
    eggCountValue,
  ])

  const contractLengthInHours =
    contractLength &&
    contractLength * { minutes: 1 / 60, hours: 1, days: 24 }[contractLengthUnit]

  const haveValues = !!(eggCount && contractLength)

  return (
    <div className="max-w-lg mx-auto mt-3">
      <div className="border border-gray-300">
        <div className="bg-gray-200">
          <h1 className="font-bold text-xl p-4">
            What egg laying rate do I need?
          </h1>
        </div>
        <div className="p-4 space-y-6 ">
          <label className="flex flex-col font-semibold">
            <div className="mb-2">Eggs Required</div>
            <Input
              type="text"
              value={eggCountValue}
              className={eggCountValue && !eggCount && 'border-red-500'}
              onChange={({ target: { value } }) => setEggCountValue(value)}
              placeholder="4200, 10K, 5.2B, 6e9, …"
            />
            <div className="h-2 text-sm text-gray-500 mt-1 ml-2 font-normal">
              {eggCount &&
                `${displayValue(eggCount, true)} (${displayValueShort(
                  eggCount
                )})`}
            </div>
          </label>
          <label className="flex flex-col font-semibold py-3">
            <div className="mb-2">Contract Length</div>
            <div className="flex space-x-2">
              <Input
                type="number"
                className="flex-grow text-right"
                placeholder="1, 2, 10, …"
                value={contractLength || ''}
                onChange={({ target: { value } }) =>
                  setContractLength(parseInt(value, 10) || null)
                }
              />
              <ButtonGroup>
                {['minutes', 'hours', 'days'].map((lengthOption) => (
                  <ButtonGroup.Button
                    key={lengthOption}
                    selected={contractLengthUnit === lengthOption}
                    onClick={() => setContractLengthUnit(lengthOption)}
                  >
                    {lengthOption}
                  </ButtonGroup.Button>
                ))}
              </ButtonGroup>
            </div>
          </label>

          {haveValues && (
            <table className="w-full max-w-sm mx-auto border border-gray-100">
              <thead className="bg-gray-200 font-medium text-xs text-gray-500 text-center">
                <tr>
                  <th className="px-2 py-1">If you had full chickens...</th>
                  <th className="px-2 py-1">Egg laying rate needed</th>
                </tr>
              </thead>
              <tbody>
                {[0, 4, 8, 12, 16, 24, 48, 72]
                  .filter((offset) => offset < contractLengthInHours)
                  .map((offset) => (
                    <tr className="text-sm even:bg-gray-100">
                      <td className="px-2 py-1 border-r-2 border-gray-100">
                        {offset ? `${offset} hours in` : 'Instantly'}
                      </td>
                      <td className="text-right px-2 py-1">
                        ~
                        {displayValueShort(
                          eggCount / (contractLengthInHours - offset),
                          0
                        )}{' '}
                        eggs/hr
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/*
      <label className="flex flex-col font-semibold">
        Chickens
        <Input type="text" placeholder="4200, 10M, 5.2B, 6e9, …" />
      </label>
      <label className="flex flex-col font-semibold">
        Egg Lay Rate
        <Input type="text" placeholder="4200, 10M, 5.2B, 6e9, …" />
        Per Hour / Per Minute
      </label>
      <label className="flex flex-col font-semibold">
        Internal Hatchery Rate
        <div className="flex">
          <Input
            type="text"
            className="flex-grow"
            placeholder="4200, 10M, 5.2B, 6e9, …"
          />
          <Button primary>per hour</Button>
          <Button>per minute</Button>
        </div>
      </label>
      */}
    </div>
  )
}

export default App
