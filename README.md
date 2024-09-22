Dreamfest is a music festival's website,
My Dev Academy senior devs built the UI and the routes, as well as having designed and seeded the initial database tables. We implemented the database functions to be used from the routes, allowing the imaginary planning team to manage locations and events.

<details>
  <summary>Full overview</summary>

You've just landed your first dev role and you're responsible for creating an app that manages DreamFest, a wholesome three day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, wellbeing workshops and sweet beats.

Your app needs to give the festival organisers the ability to add **locations** and to add **events** at those locations. As plans change, they will also need to be able to add, edit and delete events.

Fortunately, the team has already confirmed the venue and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been prepared as seed data for your database.

The design team has worked up the UI and routes, but they haven't yet connected them to the database. That's where you come in. You'll implement the database functions to be used from the routes.

</details>
<br />

Let's get stuck in!

---

## Setup

### 0. Installation and migrations

- [ ] Clone and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server.
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  Commands might look like this:

  ```
  npm i
  npm run knex migrate:latest
  npm run knex seed:run
  npm run dev
  ```

  This will create and populate the database with the existing migrations and seeds, and start the server.
  </details>


## Displaying locations and events

### 1. Show all locations

Made a `getAllLocations` function in `db/index.ts` it returns a promise that resolves to an array of locations from the database. Then compleeted the corsponding route using the getALLLocations function

### 2. Show events for a day

Made a `getEventsByDay` function with a `day` parameter. Completed the route using that same database function

## Editing locations

### 3. Show the form

Made a `getLocationById` function in `server/db/index.ts` with an `id` parameter.

### 4. Submit the form

Got the "Edit Location" form sending a HTTP PATCH request which hit's the `PATCH /api/v1/locations/:id` route, in `routes/locations.ts` useing the `useEditLocation` hook, from `client/hooks/api.ts`, this provides a react-query
mutation that makes PATCH requests to a specific location.
 
 Made a `updateLocation` function in `server/db/index.ts` with an `updatedLocation` parameter 

## Adding and deleting events

### 5. Add a new event

Pressing Submit the "Add New Event" form sends a HTTP POST request which hits the `POST /events` route, in `routes/events.ts`
 Made a `addNewEvent` function with an `event` parameter

### 6. Delete events
Deleting an event sends an HTTP POST request which hits the `POST /events/delete` route in `routes/events.ts`
Made a `deleteEvent` function with an `id` parameter
