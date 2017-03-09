var selection
var doc
var smallNudge // Based on the user's settings — typical 'move' amount (1)
var largeNudge // Based on the user's settings — typical 'shift + move' amount (10)

// Setup variables based on the context
function setup(context) {
  doc = context.document
  selection = context.selection
  // Get the values from the 'User Defaults'
  // Visible at '~/Library/Preferences/com.bohemiancoding.sketch3.plist'
  smallNudge = NSUserDefaults.standardUserDefaults().integerForKey('nudgeDistanceSmall')
  largeNudge = NSUserDefaults.standardUserDefaults().integerForKey('nudgeDistanceBig')
}


// ****************************
//   Plugin command handlers
// ****************************

function increaseVertically(context) {
  setup(context)
  changeSize(0, smallNudge)
}

function decreaseVertically(context) {
  setup(context)
  changeSize(0, -smallNudge)
}

function increaseVerticallyLarge(context) {
  setup(context)
  changeSize(0, largeNudge)
}

function decreaseVerticallyLarge(context) {
  setup(context)
  changeSize(0, -largeNudge)
}

function increaseHorizontally(context) {
  setup(context)
  changeSize(smallNudge, 0)
}

function decreaseHorizontally(context) {
  setup(context)
  changeSize(-smallNudge, 0)
}

function increaseHorizontallyLarge(context) {
  setup(context)
  changeSize(largeNudge, 0)
}

function decreaseHorizontallyLarge(context) {
  setup(context)
  changeSize(-largeNudge, 0)
}


/*
 * Change the size of the selected layers — from the centre
 * Will also unlock the constraints of the layer, if it is locked
 * Where 'x' is the change in the width
 * 'y' is the change in height
 */
function changeSize(x, y) {
  selection.forEach(layer => {
    // Unlock the constraints, if locked
    layer.setConstrainProportions(false)
    // Update the frame values
    var frame = layer.frame()
    frame.setX(frame.x() - x)
    frame.setY(frame.y() - y)
    frame.setWidth(frame.width() + 2 * x)
    frame.setHeight(frame.height() + 2 * y)
  })

  // Update the inspector, so the position and size textfields are up to date
  doc.reloadInspector()
}
