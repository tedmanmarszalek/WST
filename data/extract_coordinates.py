import shapefile
import sys
#sys.path.append("GeoVis-master")
#import geovis
#import fiona


sf = shapefile.Reader("Sculpture Shapefile/Sculpture")
shapes = sf.shapes()

records = sf.records()

# Read the bounding box from the 4th shape
#print shapes

outfile = open("output.txt", 'w')

for shape in shapes:
	x = shape.points[0][0]
	y = shape.points[0][1]
	#print x, y
	#coord = utm.to_latlon(x, y, 32, 'U')
	outfile.write(str(shape.points) + '\n')

outfile.close