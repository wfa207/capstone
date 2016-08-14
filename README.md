# DownTime
Version 1.0.0

DownTime is a mobile app, developed with React Native, that lets users keep track of productivity and location history by logging/saving locations.


[![Video](https://img.youtube.com/vi/WXJsSVdsl1k/0.jpg)](https://www.youtube.com/watch?v=WXJsSVdsl1k)
##### [Features on YouTube](https://www.youtube.com/watch?v=WXJsSVdsl1k)

### Views
##### Home Button
- Press the start button to start logging at your current location. It saves your current location into your logs and creates a time stamp that will be used to determine how long you stayed at that location. If your current location is close to one of your saved locations, update your logs at that location (to prevent duplicate entries).
- Press the stop button whenever you decide to leave the location to stop logging and see how much time you spent at that location in the logs and chart views.

##### Map
- See your current location as well as markers of all of the locations that you logged at.
- Press the bottom-right button to center the map to your current location

##### Logs (History)
- See your list of locations
- Click on a location to see details

##### Chart
- See the breakdown of today
- Percentages are relative to each other. Based off of total time spent logging at all of your locations, NOT off of total time in a day (24 hrs)


### Tentative Features 
##### Almost Complete
- Pictures of locations can be saved in AsyncStorage and displayed next to the names of locations in the log view

##### Working On
- Update a location that you already saved if you log at that location. In this case, disable the prompt that asks for a name. This should be based off of if you log at a location within a small radius of a previous logged location.
- Calendar for a history of all of your days

##### Potential Ideas
- Show information of how you moved location to location using a slider throughout the day. The slider shows the time of day
- Options List under Navbar (swipe up)
- Leave space underneath to indicate to user they can expand the bottom bar
- Have suggestions to improve productivity (suggested apps, services, recommendations, etc.)
