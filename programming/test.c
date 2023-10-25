#include<stdio.h>
int main(void)
{   
    char ch1,ch2,ch3;
    scanf("%c%c%c",&ch1,&ch2,&ch3);
    printf("스페이스키의 아스키 코드값 : %d\n",ch1);
    printf("탭의 아스키 코드값 : %d\n",ch2);
    printf("엔터의 아스키 코드값 : %d\n",ch3);
    return 0;
}