/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('groups').del()
  await knex('groups').insert([
    { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
    { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
    { id: 3, name: 'Taco bout it', image: 'taco-darkgray.png' },
  ])
}
