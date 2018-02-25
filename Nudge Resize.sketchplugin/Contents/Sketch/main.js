var selection
var doc

// Get the values from the 'User Defaults'
// Visible at '~/Library/Preferences/com.bohemiancoding.sketch3.plist'

// Based on the user's settings — typical 'move' amount (1)
var smallNudge = NSUserDefaults.standardUserDefaults().integerForKey('nudgeDistanceSmall')
// Based on the user's settings — typical 'shift + move' amount (10)
var largeNudge = NSUserDefaults.standardUserDefaults().integerForKey('nudgeDistanceBig')

// Used for determining whether to round to 'whole pixels'
var pixelFit = NSUserDefaults.standardUserDefaults().boolForKey('tryToFitToPixelBounds')

// Setup variables based on the context
function setup(context) {
  doc = context.document
  selection = context.selection
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
  selection.forEach(function(layer) {
    // Update the frame values
    var frame = layer.frame()
    var newX = frame.x() - x
    var newY = frame.y() - y
    var width = frame.width() + 2 * x
    var height = frame.height() + 2 * y

    if (pixelFit) {
      newX = Math.round(newX)
      newY = Math.round(newY)
      width = Math.round(width)
      height = Math.round(height)
    }

    layer.frame().setRectByIgnoringProportions(NSMakeRect(newX, newY, width, height))

    // Update the parent's frame, just in case it changed
    if (layer.parentGroup()) layer.parentGroup().layerDidEndResize()
  })

  // Update the inspector, so the position and size textfields are up to date
  doc.reloadInspector()
}
