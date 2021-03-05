import React, { useMemo, useState } from 'react'
import t from 'prop-types'

import { boostCombinations } from 'app/utils/boosts'
import goldenEggUrl from 'app/images/Golden_Egg.png'
import tokenUrl from 'app/images/Token.png'
import { displayValueShort } from './utils/suffixes'
import { orderBy } from 'lodash'

const BoostTable = ({ hatchRate, hasProPermit, target }) => {
  const [limit, setLimit] = useState(50)
  const [sortBy, setSortBy] = useState('cost')

  const boostsToShow = useMemo(() => {
    let combos = boostCombinations

    if (!hasProPermit) {
      combos = combos.filter((c) => c.prisms.length + c.beacons.length <= 2)
    }
    combos = combos.filter(
      (c) => c.chickensForHatchRate(hatchRate) >= target * 0.98
    )

    combos = orderBy(
      combos,
      [sortBy, 'cost', 'tokens', 'time'],
      ['asc', 'asc', 'asc', 'asc']
    )

    combos = combos.slice(0, limit)
    return combos
  }, [limit, hasProPermit, hatchRate, target, sortBy])

  return (
    <table className="w-full mx-auto border border-blue-600">
      <thead className="text-xs text-opacity-80 text-center bg-blue-600 text-white">
        <tr>
          <th></th>
          <th className="px-2 py-1">Boost Combo</th>
          <th className="px-2 py-1">Chickens Hatched</th>
          <th className="px-2 py-1">
            <button className="font-bold" onClick={() => setSortBy('cost')}>
              GE Cost{sortBy === 'cost' && ' ▲'}
            </button>
          </th>
          <th className="px-2 py-1">
            <button className="font-bold" onClick={() => setSortBy('tokens')}>
              Token Cost{sortBy === 'tokens' && ' ▲'}
            </button>
          </th>
          <th className="px-2 py-1">
            <button className="font-bold" onClick={() => setSortBy('time')}>
              Time{sortBy === 'time' && ' ▲'}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {boostsToShow.map(
          ({
            prisms,
            beacons,
            cost,
            tokens,
            time,
            key,
            chickensForHatchRate,
          }) => (
            <tr
              key={key}
              className="text-sm even:bg-gray-100 dark:even:bg-gray-700 dark:text-white text-opacity-80"
            >
              <td className="px-2 py-1 text-center">
                <span className="text-black dark:text-white text-opacity-50">
                  {prisms.map((p) => p.letter).join('')}
                  {beacons.map((b) => b.letter).join('')}
                </span>
              </td>
              <td>
                <div className="flex">
                  {prisms.map((p, i) => (
                    <div className="has-tooltip">
                      <img
                        key={`${p.name}-${i}`}
                        alt={p.name}
                        title={p.name}
                        src={p.imageUrl}
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10"
                      />
                      <div className="tooltip pointer-events-none bg-gray-900 text-white font-medium opacity-95 p-2 rounded-xl -mt-10 ml-1 sm:-mt-12 sm:ml-2 md:-mt-16 md:ml-4">
                        {p.name}
                      </div>
                    </div>
                  ))}
                  {beacons.map((b, i) => (
                    <div className="has-tooltip">
                      <img
                        key={`${b.name}-${i}`}
                        alt={b.name}
                        title={b.name}
                        src={b.imageUrl}
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10"
                      />
                      <div className="tooltip pointer-events-none bg-gray-900 text-white font-medium opacity-95 p-2 rounded-xl -mt-10 ml-1 sm:-mt-12 sm:ml-2 md:-mt-16 md:ml-4">
                        {b.name}
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-2 py-1 text-right text-black dark:text-white font-semibold">
                {displayValueShort(chickensForHatchRate(hatchRate))} 🐔
              </td>
              <td className="text-right px-2 py-1">
                {cost.toLocaleString()}{' '}
                <img className="inline" alt="Golden Eggs" src={goldenEggUrl} />
              </td>
              <td className="text-right px-2 py-1">
                {tokens.toLocaleString()}{' '}
                <img className="inline" alt="Tokens" src={tokenUrl} />
              </td>
              <td className="text-right px-2 py-1">{time} min</td>
            </tr>
          )
        )}
        {boostCombinations.length > boostsToShow.length && (
          <tr>
            <td
              colspan="6"
              className="text-center dark:text-white text-opacity-70 text-sm"
            >
              {boostCombinations.length - boostsToShow.length} boost
              combinations not shown
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

BoostTable.propTypes = {}

export default React.memo(BoostTable)
