#include <stdio.h> 
#include <stdlib.h> 

#define MAX 20 

void init(int*, int);
int position(int*, int, int);
void next(int*, int, int);
void print(int*, int);
int hasNext(int* list, int m, int n);

int main(void) { 
    int list[MAX] = {0};
    int m, n; 
    
    // printf("OzgurD m："); 
    // scanf("%d", &m); 
    // printf("OzgurD n："); 
    // scanf("%d", &n); 
    m = 1000;
    n = 3;
    init(list, n);
    print(list, n);
    while(hasNext(list, m, n)) {
        next(list, m, n);
        print(list, n);
    } 

    return 0; 
}

void init(int* list, int n) {
    int i;
    for(i = 0; i < n; i++) { list[i] = i + 1; }
}

int position(int* list, int m, int n) {
    if(list[n - 1] != m) {
        return n - 1;
    }
    else {
        int pos = n - 2;
        while(list[pos + 1] - list[pos] == 1) { pos--; }
        return pos;
    }
}

int hasNext(int* list, int m, int n) {
    return list[0] < m - n + 1;
}

void next(int* list, int m, int n) {
    int pos = position(list, m, n);
    list[pos]++; 
    int i;
    for(i = pos + 1; i < n; i++) { list[i] = list[i - 1] + 1; }
}

void print(int* list, int n) {
    int i;        
    for(i = 0; i < n; i++) { printf("%d ", list[i]); }
    putchar('\n'); 
}
