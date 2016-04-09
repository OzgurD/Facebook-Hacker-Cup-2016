#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define DBL_MAX 1.79769e+308
#define NSIZE 2000
typedef struct point {
	int x;
	int y;
}Point;

double getDistance (int x1, int y1, int x2, int y2);

int main(int argc, char const *argv[]) {
	int t, n, T, N;

	int i, j, size, point1, point2;
	double min, distance;
	// size = atoi(argv[1]);
	scanf("%d", &T);
	for (t = 0; t < T; t++) {
		// min = DBL_MAX;
		distance = 0.0;
		scanf("%d", &N);
		Point pointArray[N];
		for (n = 0; n < N; n++) {
			scanf("%d %d",&pointArray[n].x, &pointArray[n].y);
		}
		printf("%d\n", pointArray[2].y);
		// for (i = 0; i < N; i++) {
		// 	for (j = 0; j < N; j++) {
		// 		distance = getDistance(pointArray[i].x, pointArray[i].y, pointArray[j].x, pointArray[j].y);
		// 		printf("distance is %f\n", distance);
		// 		if (min > distance) {
		// 			min = distance;
		// 		}			 
		// 	}
		// }
		// printf("%f\n", min);
	}
	return 0;
}

double getDistance (int x1, int y1, int x2, int y2) {
	double distance;
	distance = sqrt(pow((x1 - x2),2) + pow((y1 - y2),2));
	// printf("%d %d %d %d = %lf\n", x1, y1, x2, y2, distance);
	return distance;
}
