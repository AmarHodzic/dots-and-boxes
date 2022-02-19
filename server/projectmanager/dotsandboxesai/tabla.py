import math
import random
import time
class Polje():
    def __init__(self=None,bottom=None,top=None,left=None,right=None,glavniDiv=None):
        self.bottom = bottom
        self.top = top
        self.left = left
        self.right = right
        self.glavniDiv = glavniDiv
brojac = 0
class Tabla():
    def __init__(self,data=None, table=None):
        self.matrica = []
        if data!=None:
            dim = math.sqrt(len(data))
            dim = int(dim)
            for i in range(dim):
                self.matrica.append([])
                for j in range(dim):
                    self.matrica[i].append(Polje(data[i*dim+j]['bottom'],data[i*dim+j]['top'],data[i*dim+j]['left'],data[i*dim+j]['right'],data[i*dim+j]['glavniDiv']))
        if table!=None:
            dim = len(table.matrica)
            for i in range(dim):
                self.matrica.append([])
                for j in range(dim):
                    self.matrica[i].append(Polje())
                    self.matrica[i][j].top = table.matrica[i][j].top
                    self.matrica[i][j].bottom = table.matrica[i][j].bottom
                    self.matrica[i][j].left = table.matrica[i][j].left
                    self.matrica[i][j].right = table.matrica[i][j].right
                    self.matrica[i][j].glavniDiv = table.matrica[i][j].glavniDiv




    def __str__(self):
        str = ''
        for i in range(len(self.matrica)):
            for j in range(len(self.matrica)):
                str+="left->{}, ".format(self.matrica[i][j].left)
                str+="right->{}, ".format(self.matrica[i][j].right)
                str+="top->{}, ".format(self.matrica[i][j].top)
                str+="bottom->{}\n".format(self.matrica[i][j].bottom)

        return str

    def get_random_move(self):
        count = 0
        while True:
            row = random.randint(0,len(self.matrica)-1)
            col = random.randint(0,len(self.matrica)-1)
            if not self.matrica[row][col].top:
                dirk='h'
                break
            if not self.matrica[row][col].left:
                dirk='v'
                break
            count+=1
            if count==30:
                row = 3
                col = 3
                dirk='v'
                break
        row_str = str(row)
        col_str = str(col)

        move ={'dir':dirk,'row':row_str,'col':col_str,'changeTurn':'true'}
        return move
    
    def get_all_moves(self):
        list_of_moves = []
        for i in range(len(self.matrica)):
            for j in range(len(self.matrica)):
                if self.matrica[i][j].top==False:
                    list_of_moves.append({'row':i,'col':j,'dir':'h'})
                if self.matrica[i][j].left==False:
                    list_of_moves.append({'row':i,'col':j,'dir':'v'})
        for i in range(len(self.matrica)):
            if self.matrica[i][len(self.matrica)-1].right==False:
                list_of_moves.append({'row':i,'col':len(self.matrica)-1,'dir':'r'})
            if self.matrica[len(self.matrica)-1][i].bottom==False:
                list_of_moves.append({'row':len(self.matrica)-1,'col':i,'dir':'b'})
        return list_of_moves
    
    def count_my_points(self):
        count = 0
        for i in range(len(self.matrica)):
            for j in range(len(self.matrica)):
                if self.matrica[i][j].glavniDiv==2:
                    count  += 1
        return count    

    def count_enemy_points(self):
        count = 0
        for i in range(len(self.matrica)):
            for j in range(len(self.matrica)):
                if self.matrica[i][j].glavniDiv==1:
                    count  += 1
        return count    
    def pobeda(self):
        if self.count_my_points()>math.ceil(((len(self.matrica)**2)/2)):
            return True
        else:
            return False
    
    def poraz(self):
        if self.count_enemy_points()>math.ceil(((len(self.matrica)**2)/2)):
            return True
        else:
            return False

    def funkcija_procene(self):
        if self.pobeda():
            return 100
        elif self.poraz():
            return -100
        br_poena = 0
        for i in range(len(self.matrica)):
            for j in range(len(self.matrica)):
                if self.matrica[i][j].glavniDiv==1:
                    br_poena -= 1
                elif self.matrica[i][j].glavniDiv==2:
                    br_poena += 1
        
        

        return br_poena

    def checkbox(self,row,col):
        if self.matrica[row][col].top==True and self.matrica[row][col].bottom==True and self.matrica[row][col].left==True and self.matrica[row][col].right==True:
            return True
        else:
            return False
    # [row][col]
    def izvrsi_potez(self,potez,player):
        #print(player)
        checked = False
        row = potez['row']
        col = potez['col']
        direction = potez['dir']
        if direction=='h':
            self.matrica[row][col].top=True
            if self.checkbox(row,col):
                self.matrica[row][col].glavniDiv=player
                checked = True
            if row!=0:
                self.matrica[row-1][col].bottom=True
                if self.checkbox(row-1,col):
                    self.matrica[row-1][col].glavniDiv=player
                    checked = True
        elif direction=='v':
            self.matrica[row][col].left=True
            if self.checkbox(row,col):
                self.matrica[row][col].glavniDiv = player
                checked = True
            if col!=0:
                self.matrica[row][col-1].right=True
                if self.checkbox(row,col-1):
                    self.matrica[row][col-1].glavniDiv=player
                    checked=True
        elif direction=='r':
            self.matrica[row][col].right =True
            if self.checkbox(row,col):
                self.matrica[row][col].glavniDiv=player
                checked=True
        elif direction=='b':
            self.matrica[row][col].bottom = True
            if self.checkbox(row,col):
                self.matrica[row][col].glavniDiv=player
                checked=True
        return checked


    def min_max(self,igrac, dubina):
        global brojac
        if dubina == 0:
            brojac+=1
            return self.funkcija_procene()
        svi_potezi = self.get_all_moves()

        if len(svi_potezi)==0:
            return self.funkcija_procene()
        else:
            vrednosti = []
            for potez in svi_potezi:
                nova_tabla = Tabla(table=self)
                menjaj = nova_tabla.izvrsi_potez(potez,igrac)
                vrednosti.append(nova_tabla.min_max(igrac if menjaj else (igrac%2)+1,dubina if menjaj else dubina-1))
        if igrac==2:
            return max(vrednosti)
        else: 
            return min(vrednosti)
            
    def min_max_ab(self,igrac,dubina,alfa,beta):
        global brojac
        best = -100 if igrac == 2 else 100
        if dubina == 0:
            brojac+=1
            return self.funkcija_procene()
        svi_potezi = self.get_all_moves()

        if len(svi_potezi)==0:
            return self.funkcija_procene()
        else:
            vrednosti = []
            for potez in svi_potezi:
                nova_tabla = Tabla(table=self)
                nemenjaj = nova_tabla.izvrsi_potez(potez,igrac)
                vred =  nova_tabla.min_max_ab(igrac if nemenjaj else (igrac%2)+1,dubina if nemenjaj else dubina-1,alfa,beta)
                vrednosti.append(vred)
                if igrac==2: #max
                    best = max(best,vred)
                    alfa = max(alfa,best)
                    if alfa>=beta:
                        return vred
                elif igrac==1:
                    best = min(best,vred)
                    beta = min(beta,best)
                    if beta<=alfa:
                        return vred
        return best

    def min_max_ab_for_hard(self,igrac,dubina,alfa,beta,start_time):
        global brojac
        best = -100 if igrac == 2 else 100
        if dubina == 0:
            brojac+=1
            return (self.funkcija_procene(), False)
        svi_potezi = self.get_all_moves()

        if len(svi_potezi)==0:
            return (self.funkcija_procene(),False)
        else:
            vrednosti = []
            for potez in svi_potezi:
                if time.time()-start_time>7:
                    return (-1,True)
                nova_tabla = Tabla(table=self)
                nemenjaj = nova_tabla.izvrsi_potez(potez,igrac)
                (vred,brejk) =  nova_tabla.min_max_ab_for_hard(igrac if nemenjaj else (igrac%2)+1,dubina if nemenjaj else dubina-1,alfa,beta,start_time)
                if brejk:
                    return (-1,True)
                vrednosti.append(vred)
                if igrac==2: #max
                    best = max(best,vred)
                    alfa = max(alfa,best)
                    if alfa>=beta:
                        return (vred,False)
                elif igrac==1:
                    best = min(best,vred)
                    beta = min(beta,best)
                    if beta<=alfa:
                        return (vred,False)
        return (best,False)

    def get_hard_move(self):
        global brojac
        
        alfa = -100
        beta = 100
        
        br_poteza = len(self.get_all_moves())
        vel_matrice = len(self.matrica)
        br_dozv = (vel_matrice+1)* (vel_matrice+1)- (vel_matrice+1) 
        if br_poteza > br_dozv:
            max_dubina = 2
        else:
            max_dubina = 3

        start_time = time.time()
        dubina = 1  
        indeks = -1
        prethodne_vrednosti = []
        while time.time()-start_time < 2 and dubina<=max_dubina:
            brojac = 0
            interupted = False
            svi_potezi = self.get_all_moves()
            if len(svi_potezi)!=0:
                vrednosti = []
                for potez in svi_potezi:
                    if time.time()-start_time > 7:
                        interupted = True
                        break
                    tabla = Tabla(table=self)
                    menjaj = tabla.izvrsi_potez(potez,2)
                    # vred = tabla.min_max_ab(2 if menjaj else 1,dubina if menjaj else dubina-1,alfa,beta)
                    (vred,brejk) = tabla.min_max_ab_for_hard(2 if menjaj else 1,dubina if menjaj else dubina-1,alfa,beta,start_time)
                    if brejk:
                        interupted=True
                        break
                    vrednosti.append(vred)
                # potez = self.min_max(3)
                # indeks = vrednosti.index(max(vrednosti))
            
            if interupted == True:
                print(vrednosti)
                print(prethodne_vrednosti)
                print(dubina)
                print(str(time.time()-start_time))
                print('I AM INTERUPTED.')
                break
            else:
                prethodne_vrednosti = vrednosti.copy()
            dubina+=1
        indeks = prethodne_vrednosti.index(max(prethodne_vrednosti))
        j = 0
        for i in svi_potezi:
            print('Potez: '+i['dir']+'  '+str(i['row'])+', '+str(i['col'])+' ima vrednost: '+str(prethodne_vrednosti[j]))
            j+=1
        print('Izabrani potez: '+str(svi_potezi[indeks]['row'])+', '+str(svi_potezi[indeks]['col']))
        print(brojac)
        print('Dubina'+str(dubina))
        print('--- %s seconds ---' % (time.time()-start_time))
        return svi_potezi[indeks]

    def get_intermediate_move(self):
        global brojac
        brojac = 0
        dubina = 2  
        alfa = -9999
        beta = 9999
        
        start_time = time.time()
        svi_potezi = self.get_all_moves()
        if len(svi_potezi)!=0:
            vrednosti = []
            for potez in svi_potezi:
                if time.time() - start_time >4:
                    print('KIKS')
                    break
                tabla = Tabla(table=self)
                menjaj = tabla.izvrsi_potez(potez,2)
                vred = tabla.min_max_ab(2 if menjaj else 1,dubina if menjaj else dubina-1,alfa,beta)
                vrednosti.append(vred)
            # potez = self.min_max(3)
            indeks = vrednosti.index(max(vrednosti))
            j = 0
            # for i in svi_potezi:
            #     print('Potez: '+str(i['row'])+', '+str(i['col'])+' ima vrednost: '+str(vrednosti[j]))
            #     j+=1
            print('Izabrani potez: '+str(svi_potezi[indeks]['row'])+', '+str(svi_potezi[indeks]['col']))
            print(brojac)
            return svi_potezi[indeks]
        else:
            return -1

    def get_easy_move(self):
        global brojac
        brojac = 0
        dubina = 1
        svi_potezi = self.get_all_moves()
        if len(svi_potezi)!=0:
            vrednosti = []
            for potez in svi_potezi:
                tabla = Tabla(table=self)
                menjaj = tabla.izvrsi_potez(potez,2)
                vrednosti.append(tabla.min_max(2 if menjaj else 1,dubina if menjaj else dubina-1))
            indeks = -1
            # potez = self.min_max(3)
            indeks_provere = vrednosti.index(max(vrednosti))
            if vrednosti.count(vrednosti[indeks_provere]) == len(vrednosti):
                print('ASD')
                indeks = random.randint(0,len(vrednosti)-1)
            else:
                indeks = indeks_provere


            j = 0
            for i in svi_potezi:
                print('Potez: '+str(i['row'])+', '+str(i['col'])+' ima vrednost: '+str(vrednosti[j]))
                j+=1
            print('Izabrani potez: '+str(svi_potezi[indeks]['row'])+', '+str(svi_potezi[indeks]['col']))
            print(brojac)
            return svi_potezi[indeks]
        else:
            return -1

    
        
        
    # def __init__(self, row, col, tabla=None):
        # self.matrica = []
        # for i in range(row):
        #     self.matrica.append([])
        #     for j in range(col):
        #         self.matrica[i].append(Polje())