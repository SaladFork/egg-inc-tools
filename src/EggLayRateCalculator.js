import ButtonGroup from 'app/components/ButtonGroup'
import Input from 'app/components/Input'
import {
  displayValue,
  displayValueShort,
  parseValueString,
} from 'app/components/utils/suffixes'
import { useState, useMemo } from 'react'
import Card from 'app/components/Card'

const EggLayRateCalculator = () => {
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
    <Card title={'What egg laying rate do I need?'}>
      <div className="p-4 space-y-6">
        <label className="flex flex-col font-semibold">
          <div className="mb-2 dark:text-white text-opacity-80">
            Eggs Required
          </div>
          <Input
            type="text"
            value={eggCountValue}
            className={eggCountValue && !eggCount && 'border-red-500'}
            onChange={({ target: { value } }) => setEggCountValue(value)}
            placeholder="4200, 10K, 5.2B, 6e9, …"
          />
          <div className="h-5 text-sm text-gray-500 mt-1 ml-2 font-normal">
            {eggCount &&
              `${displayValue(eggCount)} (${displayValueShort(eggCount)})`}
          </div>
        </label>
        <label className="flex flex-col font-semibold">
          <div className="mb-2 dark:text-white text-opacity-80">
            Contract Length
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              className="flex-grow"
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
          <table className="w-full max-w-sm mx-auto border border-blue-600">
            <thead className="font-medium text-xs text-opacity-80 text-center bg-blue-600 text-white">
              <tr>
                <th className="px-2 py-1">If you had full chickens...</th>
                <th className="px-2 py-1">Egg laying rate needed</th>
              </tr>
            </thead>
            <tbody>
              {[0, 4, 8, 12, 16, 24, 48, 72]
                .filter((offset) => offset < contractLengthInHours)
                .map((offset) => (
                  <tr
                    className="text-sm even:bg-gray-100 dark:even:bg-gray-700 dark:text-white text-opacity-80"
                    key={offset}
                  >
                    <td className="px-2 py-1 border-r-2 border-gray-100 dark:border-gray-700">
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
    </Card>
  )
}

EggLayRateCalculator.propTypes = {}

export default EggLayRateCalculator
