# Stuff to be re-done in v4

## Timebox

### States
 * position
 * isDragging
 * isShowing
 * isShimmering
 * isPosConstrained
 * isLoaded
 * display

### Behaviors
 * open drag shield while dragging
 * change position while dragging
 * hide on and off
 * shimmer on and off
 * modify position to stay on screen onResize or onChangeDisplay if enabled
 * show different displays depending on preferences


## Authentication Flow | DONE
 1. Check if authenticated, if not authenticate
 2. Check if school code is registered, 
    if not use school code provided by email, 
    if not available ask for school code

## Scheduling Service 
 * find current period(s)
 * display special shorthand
 * (optional) add patches for user schedules

## Storage
 * Sync settings

## Sync/Messenger
 * Synchronize shared state of data through message passing